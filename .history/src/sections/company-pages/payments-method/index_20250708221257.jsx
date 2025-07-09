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
      <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white">
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
          <div className="">
            <div className="flex items-center">
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-2.5">
              {dataPlan.map((item) => (
                <div key={item.id} onClick={() => handlePayment(item.id)}
                className="bg-white rounded-sm shadow-sm py"
                >
                  <div className="font-medium">{item?.name}</div>
                  <p>{item?.amount}</p>
                  <p>{item?.credits}</p>
                  <p>{item?.currency}</p>
                  <p
                    className={`${
                      item?.active === "false"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item?.active === false ? "Inactive" : "Active"}
                  </p>
                </div>
              ))}
             
            </div>
          </div>
        </div>
    </>
  );
};

export default PaymentsMethod;
