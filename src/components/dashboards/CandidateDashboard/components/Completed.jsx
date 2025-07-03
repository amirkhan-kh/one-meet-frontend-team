import React from "react";

export default function Completed({ completedData }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-2xl bg-white">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left border-b">Type</th>
              <th className="px-4 py-3 text-left border-b">Profession</th>
              <th className="px-4 py-3 text-left border-b">Completed</th>
              <th className="px-4 py-3 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {completedData.length > 0 ? (
              completedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{item.type}</td>
                  <td className="px-4 py-3 border-b">{item.profession}</td>
                  <td className="px-4 py-3 border-b">
                    {item.deadline
                      ? new Date(item.deadline).toLocaleDateString()
                      : "Not completed"}
                  </td>
                  <td className="px-4 py-3 border-b">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-3 border-b text-center" colSpan={4}>
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
