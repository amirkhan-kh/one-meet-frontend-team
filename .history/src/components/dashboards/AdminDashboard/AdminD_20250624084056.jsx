import { Outlet } from "react-router-dom";
import "./style.css";

export const AdminDashboard = () => {
  return (
    <>
      <header className="ai-header">
      <div <div className="flex items-center justify-between px-6 py-3">
        
      </div>
      </header>
      <main className="min-h-screen pt-20 bg-[#f6f7f9]">
        <section className="flex gap-3">
          <aside>aside</aside>
          <Outlet />
        </section>
      </main>
    </>
  );
};
