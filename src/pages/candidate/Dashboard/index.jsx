import Completed from "@/components/dashboards/CandidateDashboard/components/Completed";
import Pending from "@/components/dashboards/CandidateDashboard/components/Pending";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCanById } from "@/lib/hook/useCanByUser";
import "./style.css";

export default function CandidateHome() {
  const [activeTab, setActiveTab] = useState("pending");
  const [completedData, setCompletedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [completedLength, setCompletedLength] = useState(0);
  const [pendingLength, setPendingLength] = useState(0);
  const userId = useCanById();
  const canId = userId?.userId?.id;

  useEffect(() => {
    if (canId) {
      axios
        .get(
          `https://api.onemeet.app/interview/candidate/get-all/${canId}/paged`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(async (res) => {
          if (res.data.success) {
            const allData = res.data.data.content;

            const completed = allData.filter((item) =>
              [
                "STARTED",
                "IN_PROGRESS",
                "COMPLETED",
                "UNCOMPLETED",
                "EXPIRED",
              ].includes(item.status)
            );
            const pending = allData.filter((item) => item.status === "PENDING");

            setCompletedLength(completed.length);
            setPendingLength(pending.length);

            const companyIds = Array.from(
              new Set(allData.map((item) => item.companyId))
            );

            const companyInfos = await Promise.all(
              companyIds.map(async (companyId) => {
                try {
                  // 1. Kompaniya ma'lumotlari
                  const companyRes = await axios.get(
                    `https://api.onemeet.app/company/get-by-id/${companyId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "accessToken"
                        )}`,
                      },
                    }
                  );

                  if (!companyRes.data.success) return null;

                  const companyData = companyRes.data.data;
                  const companyName = companyData.name;
                  const ownerId = companyData.ownerUserId;

                  // 2. Kompaniya egasining profili
                  const ownerRes = await axios.get(
                    `https://api.onemeet.app/user/get-by-id/${ownerId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "accessToken"
                        )}`,
                      },
                    }
                  );

                  if (!ownerRes.data.success) return null;

                  const profilePictureId = ownerRes.data.data?.profilePicture;

                  let logoUrl = null;

                  if (profilePictureId) {
                    // 3. Rasmni blob formatda olish
                    const imageRes = await axios.get(
                      `https://api.onemeet.app/media/business/files/${profilePictureId}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                        },
                        responseType: "blob",
                      }
                    );
                    // 4. Blob URL yaratish
                    logoUrl = URL.createObjectURL(imageRes.data);
                  }

                  return {
                    companyId,
                    name: companyName,
                    logoUrl,
                  };
                } catch (err) {
                  console.error("Error fetching company info:", err);
                  return null;
                }
              })
            );

            const companyMap = {};
            companyInfos.forEach((info) => {
              if (info) {
                companyMap[info.companyId] = {
                  name: info.name,
                  logoUrl: info.logoUrl,
                };
              }
            });

            const completedWithCompany = completed.map((item) => ({
              ...item,
              companyName: companyMap[item.companyId]?.name,
              companyLogo: companyMap[item.companyId]?.logoUrl,
            }));

            const pendingWithCompany = pending.map((item) => ({
              ...item,
              companyName: companyMap[item.companyId]?.name,
              companyLogo: companyMap[item.companyId]?.logoUrl,
            }));

            setCompletedData(completedWithCompany);
            setPendingData(pendingWithCompany);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [canId]);

  return (
    <div className="">
      <div className="bg-gray-200">
        <div className="container">
          <p className="font-bold text-2xl mb-8 mt-4">Interviews</p>

          <div className="flex gap-6 mb-4 border-b">
            <button
              onClick={() => setActiveTab("pending")}
              className={`relative font-medium text-[16px] pb-2 ${
                activeTab === "pending"
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Pending
              <span
                className={`ml-1 text-xs px-2 py-[1px] rounded-full ${
                  activeTab === "pending"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {pendingLength}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("completed")}
              className={`relative font-medium text-[16px] pb-2 ${
                activeTab === "completed"
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Past
              <span
                className={`ml-1 text-xs px-2 py-[1px] rounded-full ${
                  activeTab === "completed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {completedLength}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {activeTab === "pending" && <Pending pendingData={pendingData} />}
        {activeTab === "completed" && (
          <Completed completedData={completedData} />
        )}
      </div>
    </div>
  );
}
