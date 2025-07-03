import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function AccountSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const isValid =
      currentPassword &&
      newPassword.length >= 8 &&
      confirmPassword.length >= 8 &&
      newPassword === confirmPassword;

    setIsChanged(isValid);
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSubmit = () => {
    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    axios
      .post(
        "https://api.onemeet.app/auth/update-password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        alert("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error(error);
        alert("Error updating password");
      });
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      {/* Current Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex justify-start gap-4">
        <button
          className={`px-4 py-2 text-white rounded-md ${isChanged ? "bg-[#2a43d4]" : "bg-gray-400 cursor-not-allowed"
            }`}
          onClick={handleSubmit}
          disabled={!isChanged}
        >
          Save Changes
        </button>
        <button
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 border rounded-md cursor-pointer"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
