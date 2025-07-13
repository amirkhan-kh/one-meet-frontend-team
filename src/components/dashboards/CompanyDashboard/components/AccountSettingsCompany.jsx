import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";

export default function AccountSettingsCompany() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Yangi parol va tasdiqlash paroli bir xil emas");
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
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error(error);
      });
  };  

  return (
    <div className="shadow p-4 bg-white rounded-md w-full md:w-[70%]">
      <div className="flex flex-col justify-between gap-10">
        <h3 className="font-semibold text-[20px]">Account Settings</h3>

        <label className="font-semibold text-[14px] flex flex-col gap-3">
          Current Password
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-gray-100 border border-gray-200 text-gray-500"
          />
        </label>

        <label className="font-semibold text-[14px] flex flex-col gap-3">
          New Password
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-gray-100 border border-gray-200 text-gray-500"
          />
        </label>

        <label className="font-semibold text-[14px] flex flex-col gap-3">
          Confirm New Password
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-100 border border-gray-200 text-gray-500"
          />
        </label>

        <div className="flex items-center justify-between">
          <span></span>
          <Button
            onClick={updatePassword}
            className="text-white bg-gradient-to-r from-[#3b45d6] to-[#611bd6] hover:text-[#d0cccc]"
            variant="outline"
          >
            Save Change
          </Button>
        </div>
      </div>
    </div>
  );
}
