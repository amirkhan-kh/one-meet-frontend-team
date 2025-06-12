import { Outlet } from "react-router-dom";
import "./style.css";
import { DashboardHeader } from "../../layouts/dashboard-header";
import { DashboardFooter } from "../../layouts/dashboard-footer";
<<<<<<< HEAD

export const CompanyD = () => {
=======
export const CompanyDashboard = () => {
>>>>>>> f4b89befb159fc11d1f60303a039e71d1a85f397
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen pt-20 bg-[#f6f7f9]">
<<<<<<< HEAD
        
=======
>>>>>>> f4b89befb159fc11d1f60303a039e71d1a85f397
        <Outlet />
      </main>
      <DashboardFooter />
    </>
  );
};
