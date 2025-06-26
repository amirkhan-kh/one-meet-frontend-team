import Completed from "@/components/dashboards/CandidateDashboard/components/Completed";
import Pending from "@/components/dashboards/CandidateDashboard/components/Pending";
import React, { useState } from "react";
import "./style.css";

export default function CandidateHome() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="">
      <div className="bg-gray-200">
        <div className="container">
          <div>
            <p className="font-bold text-2xl mb-8 mt-4">Interviews</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-4 border-b">
            <button
              onClick={() => setActiveTab("pending")}
              className={`relative font-medium text-[16px] pb-2 ${
                activeTab === "pending"
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Pending
              <span
                className={`ml-1 text-xs px-2 py-[1px] rounded-full ${
                  activeTab === "pending"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                2
              </span>
            </button>

            <button
              onClick={() => setActiveTab("completed")}
              className={`relative font-medium text-[16px] pb-2 ${
                activeTab === "completed"
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Completed
              <span
                className={`ml-1 text-xs px-2 py-[1px] rounded-full ${
                  activeTab === "completed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                5
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container">
        {activeTab === "pending" && <Pending />}
        {activeTab === "completed" && <Completed />}
      </div>
    </div>
  );
}
