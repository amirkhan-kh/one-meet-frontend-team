import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserMe } from "@/lib/hook/useUserMe";

export default function Notifications() {
  const [settings, setSettings] = useState({
    interviewReminderEnabled: true,
    marketingNotificationsEnabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useUserMe();
  const [dataId, setDataId] = useState(null);

  // Assume userProfileId is available (e.g., from auth context or props)
  const userProfileId = userId?.user?.id;
  // Fetch notification settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        if (userProfileId) {
          const response = await axios.get(
            `https://api.onemeet.app/candidate/by-user/${userProfileId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          if (response.data.success) {
            setSettings({
              interviewReminderEnabled:
                response.data.data.interviewReminderEnabled,
              marketingNotificationsEnabled:
                response.data.data.marketingNotificationsEnabled,
            });
            setDataId(response.data.data.id); 
          }
        }
      } catch (err) {
        setError("Failed to fetch notification settings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [userProfileId]);

  // Handle checkbox changes
  const handleCheckboxChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Handle save preferences
  const handleSave = async () => {
    try {
      await axios.put(
        `https://api.onemeet.app/candidate/updateCandidate/${dataId}`,
        {
          interviewReminderEnabled: settings.interviewReminderEnabled,
          marketingNotificationsEnabled: settings.marketingNotificationsEnabled,
          userProfileId: userProfileId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      
    } catch (err) {
      setError("Failed to save preferences");
      console.error(err);
    }
  };

  // Handle cancel (reset to initial fetched state)
  const handleCancel = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.onemeet.app/candidate/by-user/${userProfileId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.data.success) {
        setSettings({
          interviewReminderEnabled: response.data.data.interviewReminderEnabled,
          marketingNotificationsEnabled:
            response.data.data.marketingNotificationsEnabled,
        });
      }
    } catch (err) {
      setError("Failed to reset preferences");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const data = [
    {
      title: "Interview Deadline Reminders",
      description:
        "Get notified as interview deadlines approach so you don’t miss your opportunity",
      key: "interviewReminderEnabled",
    },
    {
      title: "Marketing Notifications",
      description:
        "Get notified about relevant marketing updates and promotions",
      key: "marketingNotificationsEnabled",
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
      {data.map((item, index) => (
        <div
          key={index}
          className="mb-4 border border-solid border-gray-200 p-4 flex justify-between items-center rounded-lg"
        >
          <div>
            <p>{item.title}</p>
            <p className="text-[14px]">{item.description}</p>
          </div>
          <div className="px-1 border border-solid border-gray-200 rounded-[4px]">
            <input
              type="checkbox"
              checked={settings[item.key]}
              onChange={() => handleCheckboxChange(item.key)}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-start gap-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#2a43d4] text-white rounded-md"
        >
          Save Preferences
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 border rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
