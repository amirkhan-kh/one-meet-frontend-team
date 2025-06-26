import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import "./style.css";
import { lists } from "@/db/static-list";
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
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Company Name</TableHead>
            <TableHead>Company Size</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead className="">Location</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lists.map((item) => (
            <TableRow key={item.}>
              <TableCell>{item.id}</TableCell>
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
    </div>
  );
};
