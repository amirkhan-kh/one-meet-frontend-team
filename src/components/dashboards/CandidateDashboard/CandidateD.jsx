import { Outlet } from "react-router-dom";
import "./style.css";
import { DashboardFooter } from "../../layouts/dashboard-footer";
import { DashboardHeader } from "../../layouts/dashboard-header";
export const CandidateD = () => {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen pt-20 bg-[#f6f7f9]">
      CandidateD
        <Outlet />
      </main>
      <DashboardFooter/>
    </>
  );
};
