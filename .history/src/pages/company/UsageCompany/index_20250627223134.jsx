import React from "react";

export const UsageCompany = () => {
  return (
    <div className="px-3 py-5 sm:p-6">
      <div>
         <h3 className="text-[18px] sm:text-4xl font-semibold mb-14">
            Usage
          </h3>
          <p className="text-[15px] mb-8">
           Interview Usage 
          </p>
      </div>
      <div>
        <h3 className="text-[18] sm:text-2xl font-semibold ">
          Recent Activity
        </h3>
        <div className="border border-[#c0c1c3] px-3 py-4 bg-white rounded-md"></div>
      </div>
    </div>
  );
};
