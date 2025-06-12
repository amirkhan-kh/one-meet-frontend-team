import { Outlet } from "react-router-dom";
import "./RecruiterD";
import { DashboardFooter } from "../../layouts/dashboard-footer";
import { DashboardHeader } from "../../layouts/dashboard-header";
export const RecruiterDashboard = () => {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen pt-20 bg-[#f6f7f9]">
        RecruiterD
        <Outlet />
      </main>
      <DashboardFooter />
    </>
  );
};
