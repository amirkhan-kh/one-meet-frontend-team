import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchPaymentsByCompany } from "@/store/company-service/payment-servce/payment-hstory-get";
import Lottie from "lottie-react";
import animationData from "../../../../public/animation/errorData.json";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.companyByOwner?.data);
const { data, loading, error } = useSelector((state) => state.paymentsByCompany);
console.log(companyData);

useEffect(() => {
  if (companyData?.id) {
    dispatch(fetchPaymentsByCompany(companyData.id));
  }
}, [companyData, dispatch]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  // const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading)
    return (
      <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white translate-y-5">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[25px] w-full rounded-xl" />
          <div className="space-y-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white w-full grid place-content-center">
        <Lottie animationData={animationData} loop autoplay style={{ height: "400px", width: "380px" }} />
      </div>
    );

  return (
    <div className="shadow-md rounded-md mb-10 bg-white translate-y-5">
      <p className="text-[19px] font-bold text-black border-l-[4px] border-[#2b43d4] p-4 rounded-tl-md bg-[#f4f5fd]">
        Payment History
      </p>
      <div className="">
        <Table>
          <TableHeader className=" text-black hover:bg-transparent focus:ring-0 border-l-[4px] border-[#2b43d4] bg-[#f4f5fd]">
            <TableRow className="hover:bg-transparent focus:ring-0 focus:outline-none border-none shadow-none p-4">
              <TableHead className="text-white translate-x-2">Name</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Credits</TableHead>
              <TableHead className="text-white">Currency</TableHead>
              <TableHead className="ps-10.5 text-white">Created At</TableHead>
              <TableHead className="text-white">Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {companyData.map((item) => ( */}
              <TableRow >
                <TableCell className="font-medium translate-x-2">
                  {companyData?.plan?.name}
                </TableCell>
                <TableCell>{companyData?.plan?.amount}</TableCell>
                <TableCell>{companyData?.plan?.credits}</TableCell>
                <TableCell>{companyData?.plan?.currency}</TableCell>
                <TableCell>
                  {companyData?.createdAt ? (
                    <>
                      <span>{companyData.createdAt.slice(0, 10).replace(/-/g, ".")}</span>
                      <span className="text-gray-500 px-2 py-1 rounded mx-3">
                        {companyData.createdAt.slice(11, 16)}
                      </span>
                    </>
                  ) : (
                    "No date"
                  )}
                </TableCell>
                <TableCell
                  className={`ps-10 font-medium ${
                    companyData?.paymentStatus === "SUCCESS"
                      ? "text-green-600"
                      : companyData?.paymentStatus === "PENDING"
                      ? "text-yellow-500"
                      : item?.paymentStatus === "FAILED"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {item?.paymentStatus || "Unknown"}
                </TableCell>
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
        <div className="flex justify-end gap-2 py-4 pr-4">
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-md text-sm ${
                  currentPage === page
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
  );
};

export default PaymentHistory;
