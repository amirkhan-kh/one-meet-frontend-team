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
import { fetchCompanyByOwnerId } from "@/store/company-service/get-profile-by-id";
import { fetchUserProfile } from "@/store/company-service/profile-get";
import { clearPaymentStatus, createPayment } from "@/store/company-service/payment-servce/payment-create-id";
import { toast } from "sonner";

const PaymentsMethod = () => {
  const dispatch = useDispatch();


//Get all plans
  const { dataPlan, loadingPlan, errorPlan } = useSelector((state) => state.plans);
  useEffect(() => {
    dispatch(fetchAllPlans());
  }, [dispatch]);

//Get max-Rec, Interview balance
 const { data } = useSelector((state) => state.companyProfileGet);

  useEffect(() => {
    if (data?.id) {
      dispatch(fetchCompanyByOwnerId(data.id));
    }
  }, [data, dispatch]);
 
  // 1. Fetch user profile
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

//Paginations
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dataPlan.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = dataPlan.slice(startIdx, startIdx + itemsPerPage);


  const ownerUserId = useSelector((state) => state.companyProfileGet?.data?.id);
  const handlePayment = (planId) => {
  const companyId = ownerUserId; 
  dispatch(createPayment({ companyId, planId }));
};
const { loading, success, error } = useSelector((state) => state.payment);
console.log();

useEffect(() => {
  if (success) {
    toast.success("Payment successfully created!");
    dispatch(clearPaymentStatus());
  }
  if (error) {
    toast.error(`Payment failed: ${error}`);
    dispatch(clearPaymentStatus());
  }
}, [success, error, dispatch]);


  if (loadingPlan) return <p>Loading...</p>;
  if (errorPlan) return <p>Error: {errorPlan}</p>;
  return (
    <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white">
    

      <div className="w-full gap-5">
       

        <div className="my-6">
          <div className="flex items-center">
          <p className=" text-[17px] font-medium">Saved Plans</p>
          
          </div>
          <div className="p-3 rounded-sm">
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
                  <TableRow key={item.id}
                     onClick={() => handlePayment(item.id)}
                  >
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
