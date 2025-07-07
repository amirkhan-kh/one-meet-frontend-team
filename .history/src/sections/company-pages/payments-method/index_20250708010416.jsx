import { fetchAllPlans } from "@/store/company-service/payment-servce/plan-get";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const PaymentsMethod = () => {
   const [open, setOpen] = useState(false);
   const [formData, setFormData] = useState({
       photo: "",
       firstName: "",
       lastName: "",
       position: "",
     });
   
      const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData((prev) => ({ ...prev, [name]: value }));
     };
   
     const handleSubmit = (e) => {
       e.preventDefault();
   
       console.log("Submitted data:", formData);
   
       setOpen(false);
     };
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.plans);
  console.log(data);

  useEffect(() => {
    dispatch(fetchAllPlans());
  }, [dispatch]);

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIdx, startIdx + itemsPerPage);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white">
      <h3 className="text-[18px] font-bold">Payment Methods</h3>

      <div className="w-full gap-5">
        <div className="my-6">
          <p className=" text-[17px] font-medium">Overivew</p>
          <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-4">
            <div className="shadow-sm p-3 rounded-sm w-full sm:w-[50%]"></div>
            <div className="shadow-sm p-3 rounded-sm w-full sm:w-[50%]">
              <p className="text-[15px] font-light"></p>
              <span className="text-[19px] font-semibold"></span>
            </div>
          </div>
        </div>

        <div className="my-6">
          <div className="flex items-center"></div>
          <p className=" text-[17px] font-medium">Saved Plans</p>
          <div className="shadow-sm p-3 rounded-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Status</TableHead>
                    
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item?.name}</TableCell>
                    <TableCell>{item?.amount}</TableCell>
                    <TableCell>{item?.credits}</TableCell>
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
      </div>
    </div>
  );
};

export default PaymentsMethod;
