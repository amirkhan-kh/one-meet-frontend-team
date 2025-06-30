import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { RecruiterDashboardHeader } from './recruiter-components/Recruiterheader/RecruiterHeader'

export const RecruiterDashboard = () => {
	return (
		<>
			{/* dashboard recruiter un */}
			<RecruiterDashboardHeader />
			<main className='min-h-screen bg-[#f6f7f9]'>
				<Toaster position='top-center' richColors />
				<Outlet />
			</main>
		</>
	)
}
