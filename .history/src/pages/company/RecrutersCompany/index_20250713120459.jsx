import React, { useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import "./RecruiterTable.css";

export const RecruitersCompany = () => {
  const token = localStorage.getItem("accessToken");
  const [companyId, setCompanyId] = useState(null);
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiterId, setSelectedRecruiterId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyId = async () => {
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
        const companyId = companyJson?.data?.id;
        if (!companyId) throw new Error("Company ID not found");

        setCompanyId(companyId);
      } catch (err) {
        console.error("❌ Failed to fetch companyId:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchCompanyId();
    else setIsLoading(false);
  }, [token]);

  useEffect(() => {
    if (companyId) fetchRecruiters();
  }, [companyId]);

  const fetchRecruiters = async () => {
    try {
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

          try {
            const userRes = await fetch(
              `https://api.onemeet.app/user/get-by-id/${recruiter.userProfileId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const userJson = await userRes.json();
            profileData = userJson.data;
          } catch (_) {
            console.log(_);
            
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
            console.log(_);
            
          }

          return {
            ...recruiter,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            timezone: profileData.timezone,
            profilePicture: profileData.profilePicture,
            authUserId: profileData.authUserId,
            email: authData.email,
          };
        })
      );

      setRecruiters(enriched);
    } catch (err) {
      console.error("❌ Failed to fetch recruiters:", err);
    }
  };

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
    (r) => r.approvedByCompany === true && r.approvedByRecruiter === true
  );
  const pendingByCompany = recruiters.filter(
    (r) => r.approvedByRecruiter === true && r.approvedByCompany !== true
  );
  const pendingByRecruiter = recruiters.filter(
    (r) => r.approvedByCompany === true && r.approvedByRecruiter !== true
  );

  const renderTable = (title, data, showAccept) => (
    <div className="recruiter-section border-l-[4px] border-[#2b43d4]">
      <h2>{title}</h2>
      {data.length === 0 ? (
        <p className="empty-row">No recruiters found</p>
      ) : (
        <table className="recruiter-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Joined At</th>
              {showAccept && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <React.Fragment key={r.id}>
                <tr
                  className={`recruiter-row ${
                    selectedRecruiterId === r.id ? "active" : ""
                  }`}
                  onClick={() =>
                    setSelectedRecruiterId((prev) =>
                      prev === r.id ? null : r.id
                    )
                  }
                >
                  <td>{r.firstName} {r.lastName}</td>
                  <td>{r.position}</td>
                  <td>{new Date(r.joinedAt).toLocaleDateString()}</td>
                  {showAccept && (
                    <td>
                      <button
                        className="accept-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAccept(r.id);
                        }}
                      >
                        Accept
                      </button>
                    </td>
                  )}
                </tr>

                {selectedRecruiterId === r.id && (
                  <tr className="recruiter-details-row">
                    <td colSpan={showAccept ? 4 : 3}>
                      <div className="recruiter-details">
                        <img
                          src={r.profilePicture}
                          alt="Profile"
                          className="recruiter-avatar"
                          onError={(e) =>
                            (e.target.src = "/default-avatar.jpg")
                          }
                        />
                        <div>
                          <p><strong>Full Name:</strong> {r.firstName} {r.lastName}</p>
                          <p><strong>Email:</strong> {r.email || "Unknown"}</p>
                          <p><strong>Time Zone:</strong> {r.timezone || "Unknown"}</p>
                          <p><strong>Position:</strong> {r.position}</p>
                          <p><strong>Joined At:</strong> {new Date(r.joinedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  if (isLoading) return <div>Loading recruiters...</div>;
  if (!companyId) return <div>Company not found</div>;

  return (
    <div className="recruiter-wrapper p-3">
      {renderTable( <><MdCheckCircleOutline/> Active Recruiters </>, approved, false)}
      {renderTable("<>Pending Approval by Company </>", pendingByCompany, true)}
      {renderTable("Join Requests from Recruiters", pendingByRecruiter, true)}
    </div>
  );
};
