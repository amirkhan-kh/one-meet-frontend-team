import { Outlet } from "react-router-dom";
import "./style.css";

export const AdminDashboard = () => {
  return (
    <>
    
      <main className="min-h-screen pt-20 bg-[#f6f7f9]">
        <section className="flex gap-3">
          <aside>aside</aside>
          <Outlet />
        </section>
      </main>
    </>
  );
};
