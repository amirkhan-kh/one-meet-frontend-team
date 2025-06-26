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
        <TableHeader className={`bg-amber-200 w-f`}>
          <TableRow>
            <TableHead className="w-[100px]">Company Name</TableHead>
            <TableHead>Company Size</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead className="text-right">Location</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
