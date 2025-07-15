import React, { useEffect, useState } from "react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComponentChart } from "../components-compony/company-chart";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterviewById } from "@/store/company-service/usage-servoce/interview-by-id";

export const UsageCompany = () => {
   const dispatch = useDispatch()
  const { data,  } = useSelector(state => state.interview)
console.log(data);

    }
  }, [interviewId, dispatch])

  const invoicesAll = [...Array(4)].flatMap(() => originalInvoices);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(invoicesAll.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = invoicesAll.slice(startIdx, startIdx + itemsPerPage);


  return (
    <div className="px-3 py-5 sm:p-6">
      <div className="flex flex-col gap-10">
        <div className="w-[70%]">
          <h3 className="text-[18px] sm:text-4xl font-bold mb-10">Interview Usage Analytics</h3>
          <p className="text-[18px] mb-8">Monitor and analyze the overall interview activities conducted by your team. This summary provides valuable insights into recruitment performance and trends over time.</p>
        </div>
        <div>
          <h3 className="text-[18px] sm:text-2xl font-semibold mb-8">
            Recent Activity
          </h3>
          <div className="shadow-md px-3 py-4 bg-white rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>№</TableHead>
                  <TableHead>Recruiter</TableHead>
                  <TableHead>Interviews Conducted</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInvoices.map((invoice, idx) => (
                  <TableRow key={`${invoice.invoice}-${idx}`}>
                    <TableCell>{(startIdx + idx + 1).toString().padStart(2, "0")}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-end gap-2 py-4 pr-4">
              {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 flex items-center justify-center rounded-md text-sm ${
                      isActive
                        ? "border border-gray-300 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

       

          <ComponentChart/>
      </div>
    </div>
  );
};
