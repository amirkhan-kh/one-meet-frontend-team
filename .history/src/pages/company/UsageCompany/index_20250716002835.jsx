import { useEffect, useState } from "react";
import InterviewUsageChart from "../components-compony/company-chart";
import "./style.css";
import { useSelector } from "react-redux";
import { FaTableList } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "EXPIRED"];

export const UsageCompany = () => {
  const token = localStorage.getItem("accessToken");
  const companyId = useSelector((state) => state.companyByOwner?.data?.id);

  const [recruiterId, setRecruiterId] = useState("all");
  const [recruiters, setRecruiters] = useState([]);

  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [direction, setDirection] = useState("desc");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (companyId) fetchRecruiters();
  }, [companyId]);

  useEffect(() => {
    if (companyId) fetchData();
  }, [companyId, recruiterId, status, sortBy, direction, page]);

  const fetchRecruiters = async () => {
    try {
      const res = await fetch(
        `https://api.onemeet.app/recruiter/get-by-company?companyId=${companyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
        page,
        size,
        sort: `${sortBy},${direction}`,
      });

      if (status !== "all") params.append("status", status);
      if (recruiterId !== "all") params.append("recruiterId", recruiterId);

      const res = await fetch(
        `https://api.onemeet.app/interview/business/company/${companyId}/paged?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
            {/* Recruiter Filter */}
            <div className="filter-group">
              <label className="filter-label">Recruiter</label>
              <Select value={recruiterId} onValueChange={setRecruiterId}>
                <SelectTrigger className="filter-select">
                  <SelectValue placeholder="Select recruiter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Recruiters</SelectItem>
                  {recruiters.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="filter-select">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="filter-select">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Created At</SelectItem>
                  <SelectItem value="score">Score</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Direction */}
            <div className="filter-group">
              <label className="filter-label">Direction</label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger className="filter-select">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="chart-box overflow-x-auto">
            {data.length === 0 ? (
              <div className="no-data">
                <img src="/no-data.jpg" alt="No data" className="no-data-image" />
                <p className="no-data-text">
                  No interviews found with these filters.
                </p>
              </div>
            ) : (
              <table className="interview-table min-w-full">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination mt-4">
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

        {/* Chart */}
        <InterviewUsageChart />
      </div>
    </div>
  );
};
