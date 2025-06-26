import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { lists } from "@/db/static-list";
import { useState } from "react";

export const ComapaniesTable = () => {
  const itemsPerPage = 14;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(lists.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = lists.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-white w-full rounded-[4px]">
      <Table className="min-w-full">
        <TableCaption>A list of your recent companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Company Size</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
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
              <TableCell>{item.statusComp}</TableCell>
              <TableCell>{item.actionStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-4 py-4 pr-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
