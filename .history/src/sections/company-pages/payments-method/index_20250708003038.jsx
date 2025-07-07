import { fetchAllPlans } from "@/store/company-service/payment-servce/plan-get";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const PaymentsMethod = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.plans);
console.log(data);

  useEffect(() => {
    dispatch(fetchAllPlans());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white">
      <h3 className="text-[18px] font-bold">Payment Methods</h3>

      <div className="w-full gap-5">
        <div className="my-6">
          <p className=" text-[17px] font-medium">Overivew</p>
          <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-4">
            <div className="shadow-sm p-3 rounded-sm w-full sm:w-[50%]">
              <p className="text-[15px] font-light"></p>
              
            </div>
            <div className="shadow-sm p-3 rounded-sm w-full sm:w-[50%]">
              <p className="text-[15px] font-light"></p>
              <span className="text-[19px] font-semibold"></span>
            </div>
          </div>
        </div>

        <div className="my-6">
          <p className=" text-[17px] font-medium">Saved Payment Methods</p>
          <div className="shadow-sm p-3 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsMethod;
