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
import { FaChartBar } from "react-icons/fa";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const InterviewUsageChart = () => {
  const [year, setYear] = useState(`${new Date().getFullYear()}`);
  const [month, setMonth] = useState(`${new Date().getMonth() + 1}`);
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState("all");
  const [data, setData] = useState([]);

  const token = localStorage.getItem("accessToken");
  const companyId = useSelector((state) => state.companyByOwner?.data?.id);

  useEffect(() => {
    if (companyId) fetchRecruiters();
  }, [companyId]);

  useEffect(() => {
    if (companyId && year && month) fetchUsageChart();
  }, [year, month, selectedRecruiter, companyId]);

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
      console.error("Failed to load recruiters", err);
    }
  };

  const fetchUsageChart = async () => {
    try {
      let url = `https://api.onemeet.app/interview/business/company/${companyId}/usage-chart?year=${year}&month=${month}`;
      if (selectedRecruiter !== "all") url += `&recruiterId=${selectedRecruiter}`;

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
    <div className="chart-contai">
      <h2 className="chart-title flex items-center gap-2.5">
        <FaChartBar className="text-blue-700" /> Interview Usage Overview
      </h2>

      <div className="chart-filters">
        {/* Year */}
        <div className="filter-group">
          <label className="filter-label">Year</label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {["2025", "2026", "2027"].map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Month */}
        <div className="filter-group">
          <label className="filter-label">Month</label>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Recruiter */}
        <div className="filter-group">
          <label className="filter-label">Recruiter</label>
          <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter}>
            <SelectTrigger className="filter-select">
              <SelectValue placeholder="All Recruiters" />
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
