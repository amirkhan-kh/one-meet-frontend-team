import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { candidateList } from "@/db/static-list";
import { useState } from "react";
export const CandidateTable = () => {
  const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(candidateList.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = candidateList.slice(startIdx, startIdx + itemsPerPage);
  return (
    <div className="bg-white w-full rounded-[4px] p-3">
      <h3>Candidates </h3>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Stack</TableHead>
            <TableHead></TableHead>
            <TableHead >Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>{startIdx + i + 1}</TableCell>
              <TableCell>{item.compName}</TableCell>
              <TableCell>{item.compSize}</TableCell>
              <TableCell>{item.industry}</TableCell>
              <TableCell>{item.locationComp}</TableCell>
              <TableCell>
                <button className={`text-sm px-3 py-1 rounded-[4px]
                  ${item.statusComp === "Active"
                  ? " bg-green-100"
                  : item.statusComp === "Pending"
                  ? " bg-yellow-100"
                  : " bg-red-100"}                
                `
                }>

                  {item.statusComp}
                </button>
              </TableCell>
              <TableCell className={``}>
                <button
                  className={`
                  text-sm px-3 py-1 rounded-[4px] 
                ${
                  item.actionStatus === "View"
                    ? "bg-gray-200"
                    : item.actionStatus === "Edit"
                    ? "bg-blue-100 "
                    : item.actionStatus === "Delete"
                    ? "bg-red-100"
                    : "bg-gray-100"
                }
              `}
                >
                  {item.actionStatus}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Raqamli Pagination */}
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
  )
}
