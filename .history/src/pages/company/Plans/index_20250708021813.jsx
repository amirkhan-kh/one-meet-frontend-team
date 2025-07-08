import AvailablePlans from "@/sections/company-pages/availabile-section";
import PaymentsMethod from "@/sections/company-pages/payments-method";
import "./style.css";

export const Plans = () => {
  return (
    <div className="p-3 sm:p-6">
      <h3 className="text-[22px] sm:text-[20px] font-bold mb-2">
        Subscription Plan Management
      </h3>
      <p className="text-[13px] sm:text-[15px] font-extralight mb-5">
        Manage your subscription plan and billing details to optimize your
        recruiting process.
      </p>


      <PaymentsMethod />
      <AvailablePlans />
    </div>
  );
};
