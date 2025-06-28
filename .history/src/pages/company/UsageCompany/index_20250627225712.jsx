import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export const UsageCompany = () => {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
  ];
  const months = [
    "Jnuary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septamber",
    "Octaber",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => 2020 + i
  );
  return (
    <div className="px-3 py-5 sm:p-6">
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="text-[18px] sm:text-4xl font-semibold mb-10">Usage</h3>
          <p className="text-[15px] mb-8">Interview Usage Summary</p>
        </div>
        <div>
          <h3 className="text-[18] sm:text-2xl font-semibold mb-8">
            Recent Activity
          </h3>
          <div className="border border-[#c0c1c3] px-3 py-4 bg-white rounded-md">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>№</TableHead>
                  <TableHead>Recruiter</TableHead>
                  <TableHead>Interviews Conducted</TableHead>
                  <TableHead>Last Interview Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.length * invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <h3 className="text-[18px] sm:text-2xl font-semibold mb-10">
            Monthly Usage Chart
          </h3>
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select mont" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, idx) => (
                  <SelectItem key={idx} value={month.toLowerCase()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
