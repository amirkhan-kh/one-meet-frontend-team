import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const UsageCompany = () => {
  const months = [
    "Jnuary",
    "February",
    "March",
    "April",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  const currentYear = new Date().getFullYear();
  // 2020 dan hozirgi yilgacha massiv yasash
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => 2020 + i
  );
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
                <SelectValue placeholder="Select mont" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, idx) => (
                  <SelectItem key={idx} value={month.toLowerCase()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
