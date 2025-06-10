import React from "react";
import { FiUsers } from "react-icons/fi";
import { FaHourglass } from "react-icons/fa6";
import { PiCrownBold } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CompanyHomeD = () => {
  return (
    <div className="p-3 sm:p-6">
      <h3 className="text-[17px] sm:text-[20px] font-bold mb-2">
        Company Dashboard
      </h3>
      <p className="text-[13px] sm:text-[15px] font-extralight">
        Manage your recruiter applications and view company activity statistics.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full py-6">
        <div
          className={` p-4 bg-white rounded-md border border-[#dbd7d7] flex flex-col gap-2 sm:gap-7`}
        >
          <h3 className={`text-[15px] font-semibold flex items-center gap-2`}>
            <FiUsers size={18} color="#1f33ad" />
            Active Recruiters
          </h3>
          <div>
            <p className="text-[#1f33ad] text-3xl">0</p>
            <p>Currently approved recruiters</p>
          </div>
        </div>

        <div
          className={`p-4 bg-white rounded-md border border-[#dbd7d7] flex flex-col gap-2 sm:gap-7`}
        >
          <h3 className={`text-[15px] font-semibold flex items-center gap-2`}>
            <FaHourglass size={18} color="#f59f0b" />
            Pending Approvals
          </h3>
          <div>
            <p className="text-[#f59f0b] text-3xl">0</p>
            <p>Awaiting your review</p>
          </div>
        </div>

        <div
          className={`p-4 bg-white rounded-md border border-[#dbd7d7] flex flex-col gap-2 sm:gap-7`}
        >
          <h3 className={`text-[15px] font-semibold flex items-center gap-2`}>
            <PiCrownBold size={18} className="text-green-600" />
            Current Plan
          </h3>
          <div>
            <p className="text-emerald-600 text-3xl">0</p>
            <p></p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
          <h3 className="text-[18px] font-bold mb-2">Manage Recruiters</h3>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Recruiters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Aproved</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p></p>
      </div>
      <div>
        <h3 className="text-[18px] font-bold mb-2">Recent Activity</h3>
        <div className="p-4 bg-white rounded-md border border-[#dbd7d7]">
          {/* active time */}
        </div>
      </div>
    </div>
  );
};

export default CompanyHomeD;
