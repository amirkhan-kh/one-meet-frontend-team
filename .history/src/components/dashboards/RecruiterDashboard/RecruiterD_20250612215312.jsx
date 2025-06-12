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
