import { Outlet } from "react-router-dom";
import "./RecruiterDash";
import { DashboardFooter } from "../../layouts/dashboard-footer";
import { DashboardHeader } from "../../layouts/dashboard-header";
export const RecruiterDash = () => {
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
