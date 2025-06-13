<<<<<<< HEAD
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { DashboardFooter } from '../../layouts/dashboard-footer'
import { DashboardHeader } from '../../layouts/dashboard-header'
import './RecruiterD'
export const RecruiterD = () => {
	return (
		<>
			<DashboardHeader />
			<main className='min-h-screen pt-20 bg-[#f6f7f9]'>
				<Toaster position='top-center' richColors />
				<Outlet />
			</main>
			<DashboardFooter />
		</>
	)
}
=======
import { Outlet } from "react-router-dom";
import "./RecruiterD";
import { DashboardFooter } from "../../layouts/dashboard-footer";
import { DashboardHeader } from "../../layouts/dashboard-header";
export const RecruiterDashboard = () => {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen pt-20">
        RecruiterD
        <Outlet />
      </main>
      <DashboardFooter />
    </>
  );
};
>>>>>>> f4b89befb159fc11d1f60303a039e71d1a85f397
