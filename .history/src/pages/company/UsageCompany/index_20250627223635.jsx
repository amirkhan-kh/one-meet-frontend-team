import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const UsageCompany = () => {
  return (
    <div className="px-3 py-5 sm:p-6">
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="text-[18px] sm:text-4xl font-semibold mb-10">Usage</h3>
          <p className="text-[15px] mb-8">Interview Usage Summary</p>
        </div>
        <div>
          <h3 className="text-[18] sm:text-2xl font-semibold mb-8">
            Recent Activity
          </h3>
          <div className="border border-[#c0c1c3] px-3 py-4 bg-white rounded-md"></div>
        </div>

        <div>
          <h3 className="text-[18px] sm:text-2xl font-semibold mb-10">
            Monthly Usage Chart
          </h3>
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
