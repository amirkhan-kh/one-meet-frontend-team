import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { lists } from "@/db/static-list";
import { useState } from "react";

export const ComapaniesTable = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(lists.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = lists.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="bg-white w-full rounded-[4px] p-3">
      <h3>Companies</h3>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Company Size</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
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
                  ? "border-1 border-green-600"
                  : item.statusComp === "Pending"
                  ? "border-1 border-yellow-600"
                }                
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
                  item.actionStatus === "Views"
                    ? "border-sky-100 border-1"
                    : item.actionStatus === "Edit"
                    ? "border-blue-100 border-1 "
                    : item.actionStatus === "View"
                    ? "border-green-300 border-1"
                    : item.actionStatus === "Delete"
                    ? "border-red-100 border-1"
                    : "border-gray-100 border-1"
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
  );
};
