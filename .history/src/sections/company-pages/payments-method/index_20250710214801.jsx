import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlans } from "@/store/company-service/payment-servce/plan-get";
import { fetchCompanyByOwnerId } from "@/store/company-service/get-profile-by-id";
import {
  createPayment,
  clearPaymentStatus,
} from "@/store/company-service/payment-servce/payment-create-id";
import { fetchPaymentsByCompany } from "@/store/company-service/payment-servce/payment-hstory-get";
import { fetchUserProfile } from "@/store/company-service/profile-get";
import { toast, Toaster } from "sonner";
import Lottie from "lottie-react";
import animationData from "../../../../public/animation/errorData.json";
import { Skeleton } from "@/components/ui/skeleton";
import "./method.css";

const PaymentsMethod = () => {
  const dispatch = useDispatch();

  const { dataPlan, loadingPlan, errorPlan } = useSelector((state) => state.plans);
  const userProfile = useSelector((state) => state.companyProfileGet.data);
  const companyData = useSelector((state) => state.companyByOwner.data);
  const { success, error } = useSelector((state) => state.payment);

  // ✅ 1. Fetch user profile (me)
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // ✅ 2. Fetch company by user ID
  useEffect(() => {
    if (userProfile?.id) {
      dispatch(fetchCompanyByOwnerId(userProfile.id));
    }
  }, [userProfile, dispatch]);

  // ✅ 3. Fetch company’s payment history
  useEffect(() => {
    if (companyData?.id) {
      dispatch(fetchPaymentsByCompany(companyData.id));
    }
  }, [companyData, dispatch]);

  // ✅ 4. Fetch all plans
  useEffect(() => {
    dispatch(fetchAllPlans());
  }, [dispatch]);

  // ✅ 5. Handle payment success or error
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

  // ✅ 6. Handle Payment Click
  const handlePayment = (planId) => {
    const companyId = companyData?.id;

    if (!companyId || !planId) {
      toast.error("Company yoki Plan ID mavjud emas");
      return;
    }

    dispatch(createPayment({ companyId, planId }))
      .unwrap()
      .then((res) => {
        if (res?.sessionUrl) {
          // window.location.href = res.sessionUrl; // Uncomment this for redirect
          console.log("✅ Payment created:", res);
        } else {
          toast.success("To'lov yaratildi, ammo session yo'q");
        }
      })
      .catch((err) => {
        toast.error(`To‘lovda xatolik: ${err}`);
      });
  };

  // ✅ Loading state
  if (loadingPlan) {
    return (
      <div className="shadow-md rounded-md px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white translate-y-5">
        <Skeleton className="h-[25px] w-full rounded-xl" />
      </div>
    );
  }

  // ✅ Error state
  if (errorPlan) {
    return (
      <div className="px-3 sm:px-6 py-4 sm:p-6 mb-10 bg-white w-full grid place-content-center">
        <Lottie animationData={animationData} loop autoplay style={{ height: "400px", width: "380px" }} />
      </div>
    );
  }

  // ✅ Render plans
  return (
    <>
      <Toaster />
      <div className="w-full py-5">
        <div className="max-h-[560px]">
          <div className="gap-x-3.5 w-full overflow-x-auto flex">
            {dataPlan.map((item) => (
              <div
                key={item.id}
                onClick={() => handlePayment(item.id)}
                className="bg-[#f4f5fd] text-black w-[900px] rounded-md shadow-md p-4 min-h-[170px] cursor-pointer transition-transform duration-300 hover:scale-[1.004]"
              >
                <p className="font-semibold mb-4 flex items-center justify-between border-b border-white pb-1 text-[22px]">
                  <span>{item?.name?.substring(0, 20)}</span>
                  <span className="text-[12px] bg-[rgba(255,255,255,0.42)] py-1.5 px-3 rounded-2xl">
                    Choose plan
                  </span>
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
                    className={`w-fit font-semibold text-[12px] bg-white ${
                      item?.active === false ? "text-red-500" : "text-green-500"
                    } py-1 px-3 rounded-sm`}
                  >
                    {item?.active === false ? "Inactive" : "Active"}
                  </p>
                  <div className="flex justify-between">
                    <span className="font-bold text-[17px]">Max. Recruiters:</span>
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
