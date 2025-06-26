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
          <TableRow>
            
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
