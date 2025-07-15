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
        if (!company?.id || !company?.name) throw new Error("Company data incomplete");

        setCompanyId(company.id);
        setCompanyName(company.name);
      } catch (err) {
        console.error("\u274C Failed to fetch company info:", err);
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
      console.log("\ud83d\udcc5 Fetching recruiters for companyId:", companyId);
      const res = await fetch(
        `https://api.onemeet.app/recruiter/get-by-company?companyId=${companyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const userJson = await userRes.json();
            profileData = userJson.data;

            if (profileData.profilePicture) {
              const avatarRes = await fetch(
                `https://api.onemeet.app/media/business/files/${profileData.profilePicture}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              if (avatarRes.ok) {
                const blob = await avatarRes.blob();
                profilePictureUrl = URL.createObjectURL(blob);
              }
            }
          } catch (_) {
            console.warn("\ud83e\udde8 User or avatar fetch error:", _);
          }

          try {
            const authRes = await fetch(
              `https://api.onemeet.app/auth/get?id=${profileData.authUserId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const authJson = await authRes.json();
            authData = authJson.data;
          } catch (_) {
            console.warn("\ud83e\udde8 Auth fetch error:", _);
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
      console.log("\u2705 Recruiters refreshed:", enriched.length);
    } catch (err) {
      console.error("\u274C Failed to fetch recruiters:", err);
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
      console.error("\u274C Failed to accept recruiter:", err);
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

  const renderTable = (title, data, showAccept) => (
    <>
    <Toaster/>
    <div className="recruiter-section shadow-sm border-l-[4px] border-[#2b43d4]">
      <div className="flex items-center justify-between">
        <h2 className="translate-x">{title}</h2>
      </div>
      {data.length === 0 ? (
        <p className="empty-row">No recruiters found</p>
      ) : (
        <Table className="recruiter-table">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Joined At</TableHead>
              {showAccept && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r) => (
              <React.Fragment key={r.id}>
                <TableRow
                  className={`recruiter-row ${
                    selectedRecruiterId === r.id ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedRecruiterId((prev) =>
                        prev === r.id ? null : r.id
                  )
                }
                >
                  <TableCell>{r.firstName} {r.lastName}</TableCell>
                  <TableCell>{r.position}</TableCell>
                  <TableCell>{new Date(r.joinedAt).toLocaleDateString()}</TableCell>
                  {showAccept && (
                    <TableCell>
                      <button
                        className="accept-btn"
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
                  <TableRow className="recruiter-details-row">
                    <TableCell colSpan={showAccept ? 4 : 3}>
                      <div className="recruiter-details">
                        <img
                          src={r.profilePicture || defaultAvatar}
                          alt="Profile"
                          className="recruiter-avatar"
                          onError={(e) => (e.target.src = defaultAvatar)}
                          />
                        <div>
                          <p><strong>Full Name:</strong> {r.firstName} {r.lastName}</p>
                          <p><strong>Email:</strong> {r.email || "Unknown"}</p>
                          <p><strong>Time Zone:</strong> {r.timezone || "Unknown"}</p>
                          <p><strong>Position:</strong> {r.position}</p>
                          <p><strong>Joined At:</strong> {new Date(r.joinedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
    </>
  );

  if (isLoading)
    return (
      <div className="p-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white mx-auto border-l-[4px] border-[#2b43d4]"
          >
            <Skeleton className="w-full rounded-xl" />
            <div className="space-y-2">
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
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1">
            <MdCheckCircleOutline size={24} className="text-green-400" />
            <h3 className="">Active Recruiters</h3>
          </div>
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
        </div>,
        approved,
        false
      )}
      {renderTable(
        <>
          <MdOpenInBrowser size={24} className="inline mr-[2px] text-sky-800" />
          Join Requests from Recruiters
        </>,
        pendingByCompany,
        true
      )}
      {renderTable(
        <>
          <MdAccessTime size={24} className="inline mr-[2px] text-blue-400" />
          Pending Approval by Company
        </>,
        pendingByRecruiter,
        false
      )}
    </div>
  );
};