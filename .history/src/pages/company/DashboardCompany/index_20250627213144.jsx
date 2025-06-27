import React from "react";
import { PiCrownLight } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { GiSandsOfTime } from "react-icons/gi";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const DashboardCompany = () => {
  return (
    <div className="px-3 py-5 sm:p-6">
      <div className="flex w-full items-center mb-8">
        <div className="w-[70%]">
          <h3 className="text-[18] sm:text-2xl font-semibold mb-4">
            Company Dashboard
          </h3>
          <p className="text-[15px] mb-8">
            Manage your recruiter applications and view company activity
            statistics.
          </p>
        </div>
        <div >
          <img
          className="h-[]"
          src="https://github.com/shadcn.png" alt="" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-3">
        <div className="border border-[#c0c1c3] px-3 py-4 bg-white rounded-md w-full sm:w-[40%]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 mb-3 sm:mb-8">
            <FiUsers size={20} color="#0f1cb2" />
            <h4 className="text-[18px] font-semibold">Active Recruiters</h4>
          </div>
          <h4 className="text-3xl font-bold text-[#0f1cb2]">0</h4>
          <p className="text-[14px] font-light text-gray-500">
            Currently approved recruiters
          </p>
        </div>
        <div className="border border-[#c0c1c3] px-3 py-4 bg-white rounded-md w-full sm:w-[40%]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 mb-3 sm:mb-8">
            <GiSandsOfTime color="#e29d13" size={20} />
            <h4 className="text-[18px] font-semibold ">Pending Approvals</h4>
          </div>
          <h4 className="text-3xl font-bold text-[#e29d13]">0</h4>
          <p className="text-[14px] font-light text-gray-500">
            Awaiting your review
          </p>
        </div>
        <div className="border border-[#c0c1c3] px-3 py-4 bg-white rounded-md w-full sm:w-[40%]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 mb-4">
            <PiCrownLight size={20} color="#13e243" />
            <h4 className="text-[18px] font-semibold">Current Plan</h4>
          </div>
          <Progress value={1} className={`text-[#13e243]`} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full py-8">
        <h3 className="text-[18] sm:text-2xl font-semibold mb-4">
          Manage Recruiters
        </h3>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pending" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="denied">Denied</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3 className="text-[18] sm:text-2xl font-semibold mb-4">
          Recent Activity
        </h3>
        <div className="border border-[#c0c1c3] px-3 py-4 bg-white rounded-md"></div>
      </div>
    </div>
  );
};

export default DashboardCompany;
