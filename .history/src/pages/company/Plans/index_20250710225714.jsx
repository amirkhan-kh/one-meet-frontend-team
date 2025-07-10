import { useSelector } from "react-redux";
import "./style.css";
import CompanyPaymentsTabs from "../components-compony/compny-plans-tabs";

export const Plans = () => {
  const company = useSelector((state) => state.companyByOwner.data);
  return (
    <div className="p-3 sm:p-6">
      <h3 className="text-[22px] sm:text-[20px] font-bold mb-2">
        Subscription Plan Management
      </h3>
      <p className="text-[13px] sm:text-[15px] font-extralight mb-5">
        Manage your subscription plan and billing details to optimize your
        recruiting process.
      </p>
  <h3 className="text-[18px] font-bold mb-5">All Methods</h3>

   <div className="my-6">
          <p className=" text-[17px] font-medium">Overivew</p>
          <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-4">
            <div className="shadow p-3 rounded-sm w-full bg-[#f4f5fd] sm:w-[50%] hover:bg-[rgb(250,250,250)] transition-colors duration-500 ease-in-out  border-l-[4px] border-[#2b43d4]">
              <p  className="text-[13px] font-light">Credits balance</p>
              <span className="text-[19px] font-semibold text-amber-700">{company?.remainingCredits}</span>
            </div>
            <div className="shadow p-3  rounded-sm w-full bg-[#f4f5fd] sm:w-[50%] hover:bg-[rgb(250,250,250)] transition-colors duration-500 ease-in-out  border-l-[4px] border-[#2b43d4]">
              <p className="text-[13px] font-light">Maximum Recruiters Allowed</p>
              <span className="text-[19px] font-semibold text-green-700">{company?.maxRecruiters}</span>
            </div>
          </div>
        </div>
   

      <CompanyPaymentsTabs/>
    </div>
  );
};
