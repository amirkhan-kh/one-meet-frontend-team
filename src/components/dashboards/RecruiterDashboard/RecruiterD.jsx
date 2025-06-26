import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { RecruiterDashboardHeader } from './recruiter-components/Recruiterheader/RecruiterHeader'

export const RecruiterDashboard = () => {
	return (
		<>
			<RecruiterDashboardHeader />
			<main className='min-h-screen pt-20 bg-[#f6f7f9]'>
				<Toaster position='top-center' richColors />
				<Outlet />
			</main>
		</>
	)
}
