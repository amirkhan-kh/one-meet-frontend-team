import { fetchAllPlans } from "@/store/company-service/payment-servce/plan-get";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyByOwnerId } from "@/store/company-service/get-profile-by-id";
import { fetchUserProfile } from "@/store/company-service/profile-get";
import {
  clearPaymentStatus,
  createPayment,
} from "@/store/company-service/payment-servce/payment-create-id";
import { toast, Toaster } from "sonner";
import Lottie from "lottie-react";
import animationData from "../../../../public/animation/errorData.json";
import { Skeleton } from "@/components/ui/skeleton";
import './method.css'
const PaymentsMethod = () => {
  const dispatch = useDispatch();

  //Get all plans
  const { dataPlan, loadingPlan, errorPlan } = useSelector(
    (state) => state.plans
  );
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

  const ownerUserId = useSelector((state) => state.companyProfileGet?.data?.id);
  const handlePayment = (planId) => {
    const companyId = ownerUserId;
    dispatch(createPayment({ companyId, planId }));
  };
  const { success, error } = useSelector((state) => state.payment);

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

  if (loadingPlan)
    return (
      <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white  translate-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Skeleton className="h-[25px] w-full rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
    );
  if (errorPlan)
    return (
      <div className="px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white w-full">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ height: "400px", width: "380px" }}
        />
      </div>
    );
  return (
    <>
      <Toaster />

      <div className="w-full py-5">
        <div className="bg-amber-200 h-">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-2.5">
            {dataPlan.map((item) => (
              <div
                key={item.id}
                onClick={() => handlePayment(item.id)}
                className="animated-gradient-card text-white rounded-md shadow-md p-4 min-h-[170px] cursor-pointer transition-transform duration-300 hover:scale-[1.004]"
              >
                <p className="font-semibold mb-4 flex items-center justify-between border-b border-white pb-1 text-[22px]">
                  <span>{item?.name}</span>
                  <span className="text-[12px] bg-[rgba(255,255,255,0.42)] py-1.5 px-3 rounded-2xl">Choose plan</span>
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-[17px]">Amount:</span>
                    <p className="font-medium">${item?.amount}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-[17px]">Credits:</span>
                    <p className="font-medium">{item?.credits}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-[17px]">Currency:</span>
                    <p className="font-medium">{item?.currency}</p>
                  </div>
                  <p
                    className={`w-fit font-semibold text-[12px] ${
                      item?.active === false ? "bg-red-600" : "bg-green-500"
                    } text-white py-1 px-3 rounded-sm`}
                  >
                    {item?.active === false ? "Inactive" : "Active"}
                  </p>
                  <div className="flex justify-between">
                    <span className="font-bold text-[17px]">
                      Max. Recruiters:
                    </span>
                    <p className="font-medium">{item?.maxRecruiters}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentsMethod;
