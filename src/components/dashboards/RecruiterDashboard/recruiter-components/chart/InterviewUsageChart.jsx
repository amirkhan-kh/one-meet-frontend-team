// File: components/charts/InterviewUsageChart.jsx

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
import { FaChartBar } from "react-icons/fa";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import "./InterviewUsageChart.css";

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
  const [data, setData] = useState([]);
  const [recruiterId, setRecruiterId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getRecruiterInfo();
  }, []);

  useEffect(() => {
    if (recruiterId && companyId && year && month) {
      fetchUsageChart();
    }
  }, [recruiterId, companyId, year, month]);

  const getRecruiterInfo = async () => {
    try {
      const userRes = await fetch("https://api.onemeet.app/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userJson = await userRes.json();
      const userProfileId = userJson.data.id;

      const recruiterRes = await fetch(
        `https://api.onemeet.app/recruiter/get-by-user/${userProfileId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const recruiterJson = await recruiterRes.json();

      setRecruiterId(recruiterJson.data.id);
      setCompanyId(recruiterJson.data.companyId);
    } catch (err) {
      console.error("❌ Failed to load recruiter info", err);
    }
  };

  const fetchUsageChart = async () => {
    try {
      const url = `https://api.onemeet.app/interview/business/company/${companyId}/usage-chart?year=${year}&month=${month}&recruiterId=${recruiterId}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      const rawData = json.data || [];

      const daysInMonth = new Date(year, month, 0).getDate();
      const completeData = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const match = rawData.find((d) => d.day === day);
        return {
          day,
          count: match ? match.count : 0,
        };
      });

      setData(completeData);
    } catch (err) {
      console.error("❌ Failed to fetch usage data", err);
    }
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title flex items-center gap-2.5">
        <FaChartBar className="text-blue-700" /> Interview Usage Overview
      </h2>

      <div className="chart-filters">
        <FilterSelect label="Year" value={year} onChange={setYear} options={["2025", "2026", "2027"].map(y => ({ label: y, value: y }))} />
        <FilterSelect label="Month" value={month} onChange={setMonth} options={months} />
      </div>

      <ChartBox data={data} />
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="filter-group">
    <label className="filter-label">{label}</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="filter-select">
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label || opt.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const ChartBox = ({ data }) => (
  <div className="chart-box">
    {data.length === 0 ? (
      <div className="no-data">
        <img src="/no-data.jpg" alt="No data" className="no-data-image" />
        <p className="no-data-text">No interviews found for this month.</p>
      </div>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} interval={0} height={40} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" name="Interviews" fill="#4F46E5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default InterviewUsageChart;
