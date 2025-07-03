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
        .then((res) => {
          if (res.data.success) {
            const allData = res.data.data.content;

            const completed = allData.filter(
              (item) =>
                item.status === "STARTED" ||
                item.status === "IN_PROGRESS" ||
                item.status === "COMPLETED" ||
                item.status === "EXPIRED"
            );
            const pending = allData.filter((item) => item.status === "PENDING");

            setCompletedData(completed);
            setPendingData(pending);

            setCompletedLength(completed.length);
            setPendingLength(pending.length);
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
          <div>
            <p className="font-bold text-2xl mb-8 mt-4">Interviews</p>
          </div>

          {/* Tabs */}
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

      {/* Content */}
      <div className="container">
        {activeTab === "pending" && <Pending pendingData={pendingData} />}
        {activeTab === "completed" && (
          <Completed completedData={completedData} />
        )}
      </div>
    </div>
  );
}
