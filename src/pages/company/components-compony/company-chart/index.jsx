import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./InterviewUsageChart.css";
import { useSelector } from "react-redux";

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const InterviewUsageChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState("");
  const [data, setData] = useState([]);

  const token = localStorage.getItem("accessToken");

  const companyId = useSelector((state) => state.companyByOwner?.data?.id);

  useEffect(() => {
    if (companyId) {
      fetchRecruiters();
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId && year && month) {
      fetchUsageChart();
    }
  }, [year, month, selectedRecruiter]);

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
        json.data.map(async (recruiter) => {
          const userRes = await fetch(
            `https://api.onemeet.app/user/get-by-id/${recruiter.userProfileId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const user = await userRes.json();
          return {
            id: recruiter.id,
            name: `${user.data.firstName} ${user.data.lastName}`,
          };
        })
      );
      setRecruiters(recruiterData);
    } catch (err) {
      console.error("Failed to load recruiters", err);
    }
  };

  const fetchUsageChart = async () => {
    try {
      let url = `https://api.onemeet.app/interview/business/company/${companyId}/usage-chart?year=${year}&month=${month}`;
      if (selectedRecruiter) url += `&recruiterId=${selectedRecruiter}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error("Failed to fetch usage data", err);
    }
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">📊 Interview Usage Overview</h2>

      <div className="chart-filters">
        <div className="filter-group">
          <label className="filter-label">Year</label>
          <select
            className="filter-select"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[2025, 2026, 2027].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Month</label>
          <select
            className="filter-select"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Recruiter</label>
          <select
            className="filter-select"
            value={selectedRecruiter}
            onChange={(e) => setSelectedRecruiter(e.target.value)}
          >
            <option value="">All Recruiters</option>
            {recruiters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chart-box">
        {data.length === 0 ? (
          <div className="no-data">
            <img src="/no-data.jpg" alt="No data" className="no-data-image" />
            <p className="no-data-text">
              No interviews recorded for this selection.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" name="Interviews" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default InterviewUsageChart;
