import { Button } from "@/components/ui/button";
import React from "react";

export default function NotificationsCompany() {
  return (
    <div className="shadow p-4 bg-white rounded-md w-full md:w-[70%]">
      <div className="flex flex-col justify-between gap-10">
        <h3 className="font-semibold text-[20px]">Notifications</h3>
        <div className="flex items-center justify-between">
          <span></span>
          <Button
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
