import { Button } from "@/components/ui/button";
import React from "react";

const pending = [
  {
    evaluation: "Visa Pre-Screen",
    from: "Visa",
  },
  {
    evaluation: "Visa Pre-Screen",
    from: "Visa",
  }
];

export default function Pending() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-2xl bg-white">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left border-b">Evaluation</th>
              <th className="px-4 py-3 text-left border-b">From</th>
              <th className="px-4 py-3 text-left border-b">Start</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">{item.evaluation}</td>
                <td className="px-4 py-3 border-b">{item.from}</td>
                <td className="px-4 py-3 border-b">
                    <Button className={"cursor-pointer"}>Start</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
