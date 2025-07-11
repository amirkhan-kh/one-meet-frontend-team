import { Button } from "@/components/ui/button";
import React from "react";

export default function Pending({ pendingData }) {
  const handleStart = (id) => {
    localStorage.setItem("entryId", id); // id ni saqlaymiz
    window.location.href = "/candidate/precheck";
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-2xl bg-white">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left border-b">Profession</th>
              <th className="px-4 py-3 text-left border-b">From</th>
              <th className="px-4 py-3 text-left border-b">Duration</th>
              <th className="px-4 py-3 text-left border-b">Deadline</th>
              <th className="px-4 py-3 text-left border-b">Start</th>
            </tr>
          </thead>
          <tbody>
            {pendingData.length > 0 ? (
              pendingData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{item.profession}</td>
                  <td className="px-4 py-3 border-b">{item.companyName}</td>
                  <td className="px-4 py-3 border-b">
                    {item.durationMinutes} min
                  </td>
                  <td className="px-4 py-3 border-b">
                    {item.deadline
                      ? new Date(item.deadline).toLocaleDateString()
                      : "Not completed"}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <Button
                      className={"cursor-pointer"}
                      onClick={() => handleStart(item.id)} // item.id ni yuboramiz
                    >
                      Start
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-3 border-b text-center" colSpan={5}>
                  No pending interviews
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
