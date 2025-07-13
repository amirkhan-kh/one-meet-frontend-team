import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserMe } from "@/lib/hook/useUserMe";

export default function Notifications() {
  const [settings, setSettings] = useState({
    interviewReminderEnabled: true,
    marketingNotificationsEnabled: true,
  });
  const [initialSettings, setInitialSettings] = useState(null); // Store initial settings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useUserMe();
  const [dataId, setDataId] = useState(null);

  const userProfileId = userId?.user?.id;

  // Check if settings have changed
  const hasChanges = initialSettings
    ? settings.interviewReminderEnabled !== initialSettings.interviewReminderEnabled ||
      settings.marketingNotificationsEnabled !== initialSettings.marketingNotificationsEnabled
    : false;

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
            const fetchedSettings = {
              interviewReminderEnabled: response.data.data.interviewReminderEnabled,
              marketingNotificationsEnabled: response.data.data.marketingNotificationsEnabled,
            };
            setSettings(fetchedSettings);
            setInitialSettings(fetchedSettings); // Store initial settings
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
      setInitialSettings(settings); // Update initial settings after successful save
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
        const fetchedSettings = {
          interviewReminderEnabled: response.data.data.interviewReminderEnabled,
          marketingNotificationsEnabled: response.data.data.marketingNotificationsEnabled,
        };
        setSettings(fetchedSettings);
        setInitialSettings(fetchedSettings); // Reset initial settings
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
          className={`px-4 py-2 rounded-md ${
            hasChanges
              ? "bg-[#2a43d4] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!hasChanges}
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