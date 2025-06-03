import { Outlet } from "react-router-dom";
import "./style.css";
import { DashboardHeader } from "../../layouts/dashboard-header";
import { DashboardFooter } from "../../layouts/dashboard-footer";
export const AdminD = () => {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen pt-20">
      AdminD
        <Outlet />
      </main>
      <DashboardFooter />
    </>
  );
};
