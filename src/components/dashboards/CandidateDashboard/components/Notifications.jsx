import React from "react";

export default function Notifications() {
  const data = [
    {
      title: "Email Notifications",
      description: "Receive email updates about your interviews",
    },
    {
      title: "Interview Reminders",
      description: "Get reminded about upcoming interviews",
    },
    {
      title: "Marketing Notifications",
      description: "Get notified about relevant marketing updates and promotions",
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
      {data.map((item, index) => (
        <div key={index} className="mb-4 border border-solid border-gray-200 p-4 flex justify-between items-center rounded-lg">
          <div>
            <p>{item.title}</p>
            <p className="text-[14px]">
              {item.description}
            </p>
          </div>
          <div className="px-1 border border-solid border-gray-200 rounded-[4px]">
            <input type="checkbox" />
          </div>
        </div>
      ))}
      <div className="flex justify-start gap-4">
        <button className="px-4 py-2 bg-[#2a43d4] text-white rounded-md">
          Save Preferences
        </button>
        <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 border rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
}
