import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllPayments } from "@/store/company-service/payment-servce/payment-hstory-get";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import animationData from '../../../../public/animation/errorData.json'
import { Skeleton } from "@/components/ui/skeleton";
const PaymentHistory = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIdx, startIdx + itemsPerPage);



  if (loading) return <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white translate-y-5">
     <div className="flex flex-col space-y-3">
      <Skeleton className="h-[25px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  </div>


  if (error) return <div className="px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white w-full grid place-content-center">
     <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ height: "400px", width: "380px" }}
          />
  </div>;
  return (
    <div className="shadow-md rounded-md mb-10 bg-white translate-y-5">
      <div className="">
        <p className=" text-[17px] font-medium text-white animated-gradient-card p-3 rounded-tl-md rounded">Payment History</p>
      </div>
      <div className="">
        <Table>
          <TableHeader className={`animated-gradient-card text-white hover:bg-transparent focus:ring-0 `}>
            <TableRow className={`hover:bg-transparent focus:ring-0 focus:outline-none border-none shadow-none`}>
              <TableHead className={`text-white`}>Name</TableHead>
              <TableHead className={`text-white`}>Amount</TableHead>
              <TableHead className={`text-white`}>Credits</TableHead>
              <TableHead className={`ps-10.5 text-white`}>Created At</TableHead>
              <TableHead className={`text-white`}>Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item?.plan?.name}
                </TableCell>
                <TableCell>{item?.plan?.amount}</TableCell>
                <TableCell>{item?.plan?.credits}</TableCell>
                <TableCell>
                  {item?.createdAt ? (
                    <>
                      <span>
                        {item.createdAt.slice(0, 10).replace(/-/g, ".")}
                      </span>{" "}
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded mx-3">
                        {item.createdAt.slice(11, 16)}
                      </span>
                    </>
                  ) : (
                    "No date"
                  )}
                </TableCell>

                <TableCell
                  className={`ps-10 font-medium ${
                    item?.paymentStatus === "SUCCESS"
                      ? "text-green-600"
                      : item?.paymentStatus === "PENDING"
                      ? "text-yellow-500"
                      : item?.paymentStatus === "FAILED"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {item?.paymentStatus || "Unknown"}
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
