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

export const ReportsTable = () => {
   const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(lists.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = lists.slice(startIdx, startIdx + itemsPerPage);
  return (
    <div>ReportsTable</div>
  )
}
