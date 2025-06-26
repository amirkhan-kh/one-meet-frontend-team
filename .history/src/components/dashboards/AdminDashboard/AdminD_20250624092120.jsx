import { Outlet } from "react-router-dom";
import "./style.css";
import { AsideAdmin } from "@/components/ui-elements/aside-admin";

export const AdminDashboard = () => {
  return (
    <>
      <header className="ai-header">
        <div className="flex items-center justify-between px-6 py-3">
          <a href="/" className="ai-logo">
            OneMeet
          </a>
          <span></span>
        </div>
      </header>
      <main className="min-h-screen pt-20 bg-[#f6f7f9]">
        <section className="flex ">
          <AsideAdmin/>
          <Outlet />
        </section>
      </main>
    </>
  );
};
