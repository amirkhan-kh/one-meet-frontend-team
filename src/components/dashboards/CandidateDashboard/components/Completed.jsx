import React from "react";

export default function Completed({ completedData }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-2xl bg-white">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left border-b">Profession</th>
              <th className="px-4 py-3 text-left border-b">From</th>
              <th className="px-4 py-3 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {completedData.length > 0 ? (
              completedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{item.profession}</td>
                  <td className="px-4 py-3 border-b flex items-center gap-2">
                    {item.companyLogo && (
                      <img
                        src={item.companyLogo}
                        alt="Company logo"
                        className="w-10 h-8 rounded-full"
                      />
                    )}
                    {item.companyName}
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
