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
          {lists.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.compName}</TableCell>
              <TableCell>{item.compSize}</TableCell>
              <TableCell>{item.industry}</TableCell>
              <TableCell>{item.locationComp}</TableCell>
              <TableCell>{item.statusComp}</TableCell>
              <TableCell>{item.statusComp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
