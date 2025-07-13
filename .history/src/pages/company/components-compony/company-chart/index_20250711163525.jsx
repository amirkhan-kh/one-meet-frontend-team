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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export const ComponentChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState("");
  const [data, setData] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

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
        console.error("Error fetching companyId:", err);
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

  useEffect(() => {
    if (companyId && year && month) fetchUsageChart();
  }, [year, month, selectedRecruiter, companyId]);

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
      console.error("Failed to fetch usage data", err);
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

  if (isLoading) return <div>Loading chart...</div>;
  if (!companyId) return <div>Company not found.</div>;

  return (
    <div className="chart-container">
      <h2 className="chart-title">Interview Usage Overview</h2>

      <div className="chart-filters">
        <div className="filter-group">
          <label className="filter-label">Year</label>
          <Select
            value={year.toString()}
            onValueChange={(val) => setYear(Number(val))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {[2025, 2026, 2027].map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Month</label>
          <Select
            value={month.toString()}
            onValueChange={(val) => setMonth(Number(val))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value.toString()}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Recruiter</label>
          <Select
            value={selectedRecruiter}
            onValueChange={(val) => {
              setSelectedRecruiter(val === "all" ? "" : val);
            }}
          >
            <SelectTrigger className="w-[180px]">
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
