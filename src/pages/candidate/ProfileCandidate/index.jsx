import { useState } from "react";
import PersonalInfo from "@/components/dashboards/CandidateDashboard/components/PersonalInfo";
import AccountSettings from "@/components/dashboards/CandidateDashboard/components/AccountSettings";
import Notifications from "@/components/dashboards/CandidateDashboard/components/Notifications";

export const ProfileCandidate = () => {
  const [activeTab, setActiveTab] = useState("personal");
  return (
    <div className="container">
      <div className="mb-8">
        <p className="font-bold text-2xl mb-4">Your Profile</p>
        <p>Manage your personal information and account settings</p>
      </div>
      <div className="flex gap-8 flex-col md:flex-row">
        {/* Sidebar */}
        <div>
          <div className="border border-solid border-gray-200 rounded-lg p-10 text-center mb-5">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto"></div>
            <button
              onClick={() => alert("Upload Photo")}
              className="bg-gray-50 px-4 py-2 rounded mt-3 border border-solid border-gray-300 hover:bg-gray-100"
            >
              Upload Photo
            </button>
          </div>
          <div className="w-full p-4 border border-solid border-gray-200 rounded-lg">
            <button
              onClick={() => setActiveTab("personal")}
              className={`w-full text-center px-4 py-2 rounded  ${
                activeTab === "personal"
                  ? " text-[#2a43d4] hover:bg-gray-100 border border-solid border-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full text-center px-4 py-2 rounded my-2 ${
                activeTab === "account"
                  ? "text-[#2a43d4] hover:bg-gray-100 border border-solid border-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Account Settings
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full text-center px-4 py-2 rounded ${
                activeTab === "notifications"
                  ? "text-[#2a43d4] hover:bg-gray-100 border border-solid border-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Notifications
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full border border-solid border-gray-200 rounded-lg p-5">
          {activeTab === "personal" && <PersonalInfo />}
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "notifications" && <Notifications />}
        </div>
      </div>
    </div>
  );
};
