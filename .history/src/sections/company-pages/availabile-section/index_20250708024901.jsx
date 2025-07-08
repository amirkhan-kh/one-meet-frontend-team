
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchAllPayments } from "@/store/company-service/payment-servce/payment-hstory-get";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const PaymentHistory = () => {


  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIdx, startIdx + itemsPerPage);
  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="my-6">
          <div className="flex items-center">
          <p className=" text-[17px] font-medium">Saved Plans</p>
          
          </div>
          <div className="shadow-sm p-3 rounded-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Payment Status</TableHead>
                    
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item?.plan.name}</TableCell>
                    <TableCell>{item?.plan.amount}</TableCell>
                    <TableCell>{item?.plan?.credits}</TableCell>
                    <TableCell>{item?.currency}</TableCell>
                    <TableCell
                      className={`${
                        item?.active === "false"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {item?.active === false ? "Inactive" : "Active"}
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
