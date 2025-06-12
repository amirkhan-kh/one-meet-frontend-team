import { Outlet } from "react-router-dom";
import "./style.css";
import { DashboardHeader } from "../../layouts/dashboard-header";
import { DashboardFooter } from "../../layouts/dashboard-footer";
export const CompanyDashboard = () => {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen pt-20 bg-[#f6f7f9]">
        <Outlet />
      </main>
      <DashboardFooter />
    </>
  );
};
