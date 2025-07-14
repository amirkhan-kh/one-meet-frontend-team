import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentsByCompany } from "@/store/company-service/payment-servce/payment-hstory-get";
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
  const { data, loading, error } = useSelector(
    (state) => state.paymentsByCompany
  );
  console.log(companyData.id);
  console.log(data.content);

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
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ height: "400px", width: "380px" }}
        />
      </div>
    );

  return (
    <div className="shadow-sm rounded-md mb-10 bg-white translate-y-5 border-[#2b43d4] border-l-[4px]">
      <div className="bg-[#f4f5fd] w-full ps-3 rounded-l-md">
        <p className="text-[19px] font-bold text-black  rounded-tl-md ">
          Payment History
        </p>
      </div>
      <div className="">
        <Table>
          <TableHeader className=" text-black hover:bg-transparent focus:ring-0 bg-[#f4f5fd]">
            <TableRow className="bg-[#f4f5fd]  hover:bg-bg-[#f4f5fd]  focus:ring-0 focus:outline-none border-none shadow-none p-4">
              <TableHead className=" translate-x-2">Name</TableHead>
              <TableHead className="">Amount</TableHead>
              <TableHead className="">Credits</TableHead>
              <TableHead className="">Currency</TableHead>
              <TableHead className="ps-10.5 ">Created At</TableHead>
              <TableHead className="">Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.content?.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell className="font-medium translate-x-2">
                  {companyData?.name}
                </TableCell>
                <TableCell className={`translate-x-3`}>{item.plan?.amount || "-"}</TableCell>
                <TableCell className={`translate-x-3`}>{item.plan?.credits || "-"}</TableCell>
                <TableCell className={`translate-x-3`}>{item.plan?.currency || "-"}</TableCell>
                <TableCell>
                  {item.createdAt ? (
                    <>
                      <span>
                        {item.createdAt.slice(0, 10).replace(/-/g, ".")}
                      </span>
                      <span className="text-gray-500 px-2 py-1 rounded mx-3">
                        {item.createdAt.slice(11, 16)}
                      </span>
                    </>
                  ) : (
                    "No date"
                  )}
                </TableCell>
                <TableCell
                  className={`ps-10 font-medium ${
                    item.paymentStatus === "SUCCESS"
                      ? "text-green-600"
                      : item.paymentStatus === "PENDING"
                      ? "text-yellow-500"
                      : item.paymentStatus === "FAILED"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {item.paymentStatus || "Unknown"}
                </TableCell>
              </TableRow>
            ))}
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
