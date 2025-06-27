import React from 'react';

const completed = [
  {
    evaluation: "AI Tutor Written Exercise",
    from: "xAI",
    completed: "May 10, 2025"
  },
  {
    evaluation: "General Assessment",
    from: "xAI",
    completed: "May 9, 2025"
  },
  {
    evaluation: "Visa Pre-Screen",
    from: "Visa",
    completed: "Oct 20, 2024"
  },
  {
    evaluation: "Practice Coding Questions",
    from: "Practice Coding Questions Framework",
    completed: "Nov 27, 2023"
  },
  {
    evaluation: "Visa Pre-Screen",
    from: "Visa",
    completed: "Nov 12, 2023"
  }
];

export default function Completed() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-2xl bg-white">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left border-b">Evaluation</th>
              <th className="px-4 py-3 text-left border-b">From</th>
              <th className="px-4 py-3 text-left border-b">Completed</th>
            </tr>
          </thead>
          <tbody>
            {completed.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">{item.evaluation}</td>
                <td className="px-4 py-3 border-b">{item.from}</td>
                <td className="px-4 py-3 border-b">{item.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
