import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export const RecruitersCompany = () => {
     const [currentPage, setCurrentPage] = useState(1);
    
      const totalPages = Math.ceil(candidateList.length / itemsPerPage);
      const startIdx = (currentPage - 1) * itemsPerPage;
      const currentItems = candidateList.slice(startIdx, startIdx + itemsPerPage);
  return (
    <div className="p-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">RecruitersCompany</h2>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Confirmed Recruiters</h3>
          <div className="bg-white rounded-sm p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Confirmed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Anna </TableCell>
                  <TableCell>anna@gmail.com</TableCell>
                  <TableCell>2024-20-01</TableCell>
                  <TableCell>Confirmed</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableBody>
            </Table>
             <div className="flex justify-end gap-2 py-4 pr-4">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-md text-sm
                ${
                  isActive
                    ? "border border-gray-300 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Sent Invitations</h3>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Incoming Join requests
          </h3>
        </div>
      </div>
    </div>
  );
};
