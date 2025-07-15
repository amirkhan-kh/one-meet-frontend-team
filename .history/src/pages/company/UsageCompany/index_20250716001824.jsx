import { useEffect, useState } from "react";
import InterviewUsageChart from "../components-compony/company-chart";
import "./style.css";
import { useSelector } from "react-redux";
import { FaTableList } from "react-icons/fa6";

const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "EXPIRED"];

export const UsageCompany = () => {
  const token = localStorage.getItem("accessToken");
  const companyId = useSelector((state) => state.companyByOwner?.data?.id);

  const [recruiterId, setRecruiterId] = useState("");
  const [recruiters, setRecruiters] = useState([]);

  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [direction, setDirection] = useState("desc");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
console.log(setSize);

  useEffect(() => {
    if (companyId) {
      fetchRecruiters();
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) {
      fetchData();
    }
  }, [companyId, recruiterId, status, sortBy, direction, page, size]);

  const fetchRecruiters = async () => {
    try {
      const res = await fetch(
        `https://api.onemeet.app/recruiter/get-by-company?companyId=${companyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();
      const recruiterData = await Promise.all(
        (json.data || []).map(async (recruiter) => {
          try {
            const userRes = await fetch(
              `https://api.onemeet.app/user/get-by-id/${recruiter.userProfileId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const user = await userRes.json();
            return {
              id: recruiter.id,
              name: `${user.data.firstName} ${user.data.lastName}`,
            };
          } catch {
            return { id: recruiter.id, name: "Unknown" };
          }
        })
      );
      setRecruiters(recruiterData);
    } catch (err) {
      console.error("❌ Failed to fetch recruiters:", err);
    }
  };

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        status,
        page,
        size,
        sort: `${sortBy},${direction}`,
      });
      if (recruiterId) params.append("recruiterId", recruiterId);

      const res = await fetch(
        `https://api.onemeet.app/interview/business/company/${companyId}/paged?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();
      setData(json.data?.content || []);
      setTotalPages(json.data?.totalPages || 0);
    } catch (err) {
      console.error("❌ Failed to fetch interviews:", err);
    }
  };

  return (
    <div className="px-3 py-5 sm:p-6">
      <div className="flex flex-col gap-10">
        <div className="chart-cont">
          <h2 className="chart-title flex items-center gap-2.5">
            <FaTableList className="text-blue-700" /> Interview Records
          </h2>

          <div className="chart-filters">
            <div className="filter-group">
              <label className="filter-label">Recruiter</label>
              <Select
                className="filter-select"
                value={recruiterId}
                onChange={(e) => setRecruiterId(e.target.value)}
              >
                <option value="">All Recruiters</option>
                {recruiters.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <Select
                className="filter-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Created At</option>
                <option value="score">Score</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Direction</label>
              <select
                className="filter-select"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          <div className="chart-box">
            {data.length === 0 ? (
              <div className="no-data">
                <img
                  src="/no-data.jpg"
                  alt="No data"
                  className="no-data-image"
                />
                <p className="no-data-text">
                  No interviews found with these filters.
                </p>
              </div>
            ) : (
              <table className="interview-table">
                <thead>
                  <tr>
                    <th>Profession</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Score</th>
                    <th>Deadline</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((i) => (
                    <tr key={i.id}>
                      <td>{i.profession}</td>
                      <td>{i.type}</td>
                      <td>{i.status}</td>
                      <td>{i.score}</td>
                      <td>{new Date(i.deadline).toLocaleDateString()}</td>
                      <td>{new Date(i.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page === 0}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              >
                ⬅ Prev
              </button>
              <span>
                Page {page + 1} of {totalPages}
              </span>
              <button
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next ➡
              </button>
            </div>
          )}
        </div>

        <InterviewUsageChart />
      </div>
    </div>
  );
};
