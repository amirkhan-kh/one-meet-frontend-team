import { Outlet } from "react-router-dom";
import "./style.css";
import { DashboardHeader } from "../../layouts/dashboard-header";
import { DashboardFooter } from "../../layouts/dashboard-footer";
export const CompanyD = () => {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen pt-20">
    CompanyD
        <Outlet />
      </main>
      <DashboardFooter />
    </>
  );
};
