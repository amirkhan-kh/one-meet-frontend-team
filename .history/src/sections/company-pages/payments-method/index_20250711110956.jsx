import React, { useEffect, useRef } from "react";
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
  const scrollRef = useRef(null);
  const { success, error } = useSelector((state) => state.payment);
  const { dataPlan, loadingPlan, errorPlan } = useSelector(
    (state) => state.plans
  );

  const { data } = useSelector((state) => state.companyProfileGet);
  const companyData = useSelector((state) => state.companyByOwner.data);

  // 1. Fetch user profile (me)
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // 2. Fetch company by user ID
  useEffect(() => {
    if (data?.id) {
      dispatch(fetchCompanyByOwnerId(data?.id));
    }
  }, [data, dispatch]);

  // 3. Fetch company’s payment history
  useEffect(() => {
    if (companyData?.id) {
      dispatch(fetchPaymentsByCompany(companyData?.id));
    }
  }, [companyData, dispatch]);

  // 4. Fetch all plans
  useEffect(() => {
    dispatch(fetchAllPlans());
  }, [dispatch]);

  // 5. Handle payment status
  useEffect(() => {
    if (success) {
      toast.success("To‘lov muvaffaqiyatli yaratildi!");
      dispatch(clearPaymentStatus());
    }
    if (error) {
      toast.error(`Xatolik: ${error}`);
      dispatch(clearPaymentStatus());
    }
  }, [success, error, dispatch]);

  // 6. Create payment
  const handlePayment = (planId) => {
    const companyId = companyData?.id;
    console.log("Plan ID:", planId);

    console.log("Company ID:", companyId);

    if (!companyId || !planId) {
      toast.error("Company yoki Plan ID topilmadi");
      return;
    }

    dispatch(createPayment({ companyId, planId }))
      .unwrap()
      .then((res) => {
        if (res) {
          console.log("✅ Stripe session:", res);
        } else {
          toast.success("To‘lov yaratildi, lekin sessionUrl yo‘q");
        }
      })
      .catch((err) => {
        toast.error(`Xatolik: ${err}`);
      });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX, scrollLeft;

    const mouseDown = (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const mouseLeaveOrUp = () => {
      isDown = false;
    };
    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // speed factor
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", mouseDown);
    container.addEventListener("mouseleave", mouseLeaveOrUp);
    container.addEventListener("mouseup", mouseLeaveOrUp);
    container.addEventListener("mousemove", mouseMove);

    return () => {
      container.removeEventListener("mousedown", mouseDown);
      container.removeEventListener("mouseleave", mouseLeaveOrUp);
      container.removeEventListener("mouseup", mouseLeaveOrUp);
      container.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Loading
  if (loadingPlan) {
    return (
      <div className="shadow-md rounded-md px-6 py-6 mb-10 bg-white">
        <Skeleton className="h-[25px] w-full rounded-xl" />
      </div>
    );
  }

  // Error
  if (errorPlan) {
    return (
      <div className="px-6 py-6 mb-10 bg-white w-full grid place-content-center">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ height: "400px", width: "380px" }}
        />
      </div>
    );
  }

  // Render
  return (
    <>
      <Toaster />
      <div className="w-full py-5">
        <div className="w-full overflow-x-auto">
          <div
            ref={scrollRef}
            className="flex gap-x-4 px-2 pb-2 overflow-x-auto scroll-hide cursor-grab active:cursor-grabbing"
          >
            {dataPlan.map((item) => (
              <div
                key={item.id}
                onClick={() => handlePayment(item.id)}
                className="bg-[#f4f5fd] text-black w-[300px]  sm:w-[400px] min-w-[300px] sm:min-w-[400px] rounded-md shadow-md p-4 cursor-pointer transition-transform duration-300 hover:scale-[1.006] border-l-[4px] border-[#2b43d4]"
              >
                <p className="font-semibold mb-4 flex items-center justify-between border-b border-gray-300 pb-2 text-[22px]">
                  <span>{item?.name?.substring(0, 20)}</span>
                  <span className="text-[12px] bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(108,107,107,0.1)] py-1.5 px-3 rounded-2xl">
                    Choose plan
                  </span>
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="font-bold">Amount:</span>
                    <p>${item?.amount}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Credits:</span>
                    <p>{item?.credits}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Currency:</span>
                    <p>{item?.currency}</p>
                  </div>
                  <p
                    className={`w-fit font-semibold text-[12px] bg-white ${
                      item?.active === false ? "text-red-500" : "text-green-500"
                    } py-1 px-3 rounded-sm`}
                  >
                    {item?.active === false ? "Inactive" : "Active"}
                  </p>
                  <div className="flex justify-between">
                    <span className="font-bold">Max. Recruiters:</span>
                    <p>{item?.maxRecruiters}</p>
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
