import React, { useEffect, useState, useCallback } from "react";
import {
  MdCheckCircleOutline,
  MdAccessTime,
  MdOpenInBrowser,
} from "react-icons/md";
import "./RecruiterTable.css";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyCreateRecruiterModal from "./ui-components-company/modal-recruiter-post";
import Lottie from "lottie-react";
import animationData from "../../../../public/animation/errorData.json";
import defaultAvatar from "../../../../public/default-avatar.avif";
import { toast, Toaster } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const RecruitersCompany = () => {
  const token = localStorage.getItem("accessToken");
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiterId, setSelectedRecruiterId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    approved: 1,
    pendingByCompany: 1,
    pendingByRecruiter: 1,
  });

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const userRes = await fetch("https://api.onemeet.app/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userJson = await userRes.json();
        const userId = userJson?.data?.id;
        if (!userId) throw new Error("User ID not found");

        const companyRes = await fetch(
          `https://api.onemeet.app/company/get-by-ownerUserId/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const companyJson = await companyRes.json();
        const company = companyJson?.data;
        if (!company?.id || !company?.name)
          throw new Error("Company data incomplete");

        setCompanyId(company.id);
        setCompanyName(company.name);
      } catch (err) {
        console.error("❌ Failed to fetch company info:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchCompanyInfo();
    else setIsLoading(false);
  }, [token]);

  const fetchRecruiters = useCallback(async () => {
    if (!companyId) return;
    try {
      const res = await fetch(
        `https://api.onemeet.app/recruiter/get-by-company?companyId=${companyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();
      const rawRecruiters = json.data || [];

      const enriched = await Promise.all(
        rawRecruiters.map(async (recruiter) => {
          let profileData = {};
          let authData = {};
          let profilePictureUrl = null;

          try {
            const userRes = await fetch(
              `https://api.onemeet.app/user/get-by-id/${recruiter.userProfileId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const userJson = await userRes.json();
            profileData = userJson.data;

            if (profileData.profilePicture) {
              const avatarRes = await fetch(
                `https://api.onemeet.app/media/business/files/${profileData.profilePicture}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              if (avatarRes.ok) {
                const blob = await avatarRes.blob();
                profilePictureUrl = URL.createObjectURL(blob);
              }
            }
          } catch (_) {
            console.log(_);
          }

          try {
            const authRes = await fetch(
              `https://api.onemeet.app/auth/get?id=${profileData.authUserId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const authJson = await authRes.json();
            authData = authJson.data;
          } catch (_) {
            console.log(_);
          }

          return {
            ...recruiter,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            timezone: profileData.timezone,
            profilePicture: profilePictureUrl,
            authUserId: profileData.authUserId,
            email: authData.email,
          };
        })
      );

      setRecruiters(enriched);
    } catch (err) {
      console.error("❌ Failed to fetch recruiters:", err);
    }
  }, [companyId, token]);

  useEffect(() => {
    if (companyId) fetchRecruiters();
  }, [companyId, fetchRecruiters]);

  const handleAccept = async (recruiterId) => {
    try {
      await fetch(`https://api.onemeet.app/recruiter/update/${recruiterId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          approvedByCompany: true,
          approvedByRecruiter: true,
        }),
      });
      fetchRecruiters();
    } catch (err) {
      console.error("❌ Failed to accept recruiter:", err);
    }
  };

  const approved = recruiters.filter(
    (r) => r.approvedByCompany && r.approvedByRecruiter
  );
  const pendingByCompany = recruiters.filter(
    (r) => r.approvedByRecruiter && !r.approvedByCompany
  );
  const pendingByRecruiter = recruiters.filter(
    (r) => !r.approvedByCompany && !r.approvedByRecruiter
  );

  const renderTable = (title, data, showAccept, key) => {
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const currentPage = pagination[key];
    const currentItems = data.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return (
      <div className="recruiter-section shadow-sm border-l-[4px] border-[#2b43d4] mt-4">
        <Toaster />
        <div className="flex items-center justify-between">
          <h2 className="translate-x-5">{title}</h2>
        </div>
        {data.length === 0 ? (
          <div className="px-5">
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="text-black bg-[#f4f5fd] hover:bg-[#f4f5fd] ">
                  <TableHead className={`translate-x-3`}>Name</TableHead>
                  <TableHead className={`translate-x-3`}>Position</TableHead>
                  <TableHead className={`translate-x-3`}>Joined At</TableHead>
                  {showAccept && <TableHead>Action</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((r) => (
                  <React.Fragment key={r.id}>
                    <TableRow
                      className={`bg-white hover:bg-white translate-x-3 ${
                        selectedRecruiterId === r.id ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedRecruiterId((prev) =>
                          prev === r.id ? null : r.id
                        )
                      }
                    >
                      <TableCell>
                        {r.firstName} {r.lastName}
                      </TableCell>
                      <TableCell>{r.position}</TableCell>
                      <TableCell>
                        {new Date(r.joinedAt).toLocaleDateString()}
                      </TableCell>
                      {showAccept && (
                        <TableCell>
                          <button
                            className="bg-blue-700 text-white px-2 py-0.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAccept(r.id);
                            }}
                          >
                            Accept
                          </button>
                        </TableCell>
                      )}
                    </TableRow>
                    {selectedRecruiterId === r.id && (
                      <TableRow>
                        <TableCell colSpan={showAccept ? 4 : 3}>
                          <div className="recruiter-details">
                            <img
                              src={r.profilePicture || defaultAvatar}
                              alt="Profile"
                              className="recruiter-avatar"
                              onError={(e) => (e.target.src = defaultAvatar)}
                            />
                            <div>
                              <p>
                                <strong>Full Name:</strong> {r.firstName}{" "}
                                {r.lastName}
                              </p>
                              <p>
                                <strong>Email:</strong> {r.email || "Unknown"}
                              </p>
                              <p>
                                <strong>Time Zone:</strong>{" "}
                                {r.timezone || "Unknown"}
                              </p>
                              <p>
                                <strong>Position:</strong> {r.position}
                              </p>
                              <p>
                                <strong>Joined At:</strong>{" "}
                                {new Date(r.joinedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex justify-end gap-2 py-4 pr-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, [key]: i + 1 }))
                    }
                    className={`w-9 h-9 rounded-md text-sm ${
                      currentPage === i + 1
                        ? "border border-gray-300 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  if (isLoading)
    return (
      <div className="p-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="shadow-md rounded-md p-6 mb-10 bg-white border-l-[4px] border-[#2b43d4]"
          >
            <Skeleton className="w-full rounded-xl" />
            <div className="space-y-2 mt-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    );

  if (!companyId)
    return (
      <div className="grid place-content-center">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ height: "400px", width: "380px" }}
        />
      </div>
    );

  return (
    <div className="p-3">
      {renderTable(
        <div className=" mb-4">
          <CompanyCreateRecruiterModal
            companyId={companyId}
            companyName={companyName}
            onSuccess={async () => {
              toast.loading("Refreshing recruiter list...");
              await fetchRecruiters();
              toast.dismiss();
              toast.success("Recruiters updated");
            }}
          />
          <div className="flex items-center gap-2 mb-6">
            <MdCheckCircleOutline size={24} className="text-green-400" />
            <h3>Active Recruiters</h3>
          </div>
        </div>,
        approved,
        false,
        "approved"
      )}
      {renderTable(
        <div className="flex items-center gap-3">
          <MdOpenInBrowser size={24} className="text-sky-800" />
          Join Requests from Recruiters
        </div>,
        pendingByCompany,
        true,
        "pendingByCompany"
      )}
      {renderTable(
        <div className="flex items-center gap-3">
          <MdAccessTime size={24} className="text-blue-400" />
          Pending Approval by Company
        </div>,
        pendingByRecruiter,
        false,
        "pendingByRecruiter"
      )}
    </div>
  );
};
