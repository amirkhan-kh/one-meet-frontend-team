import { Button } from "@/components/ui/button";
import { useCanById } from "@/lib/hook/useCanByUser";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Pending() {
  const [pending, setPending] = useState([]);
  const userId = useCanById();
  const canId = userId?.userId?.id;

  useEffect(() => {
    if (canId) {
      axios
        .get(
          `https://api.onemeet.app/interview/candidate/get-all/${canId}/paged?status=STARTED`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            setPending(res.data.data.content);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [canId]);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-2xl bg-white">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left border-b">Company</th>
              {/* <th className="px-4 py-3 text-left border-b">Language</th> */}
              {/* <th className="px-4 py-3 text-left border-b">Profession</th> */}
              <th className="px-4 py-3 text-left border-b">Completed</th>
              <th className="px-4 py-3 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {pending.length > 0 ? (
              pending.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{item.companyId}</td>
                  {/* <td className="px-4 py-3 border-b">{item.language}</td> */}
                  {/* <td className="px-4 py-3 border-b">{item.profession}</td> */}
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
                <td className="px-4 py-3 border-b text-center" colSpan={5}>
                  Ma'lumot topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
