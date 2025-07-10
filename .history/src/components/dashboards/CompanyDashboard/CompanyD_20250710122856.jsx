import { Outlet } from 'react-router-dom'
import { CompanyHeader } from '@/pages/company/components-compony/header-company'
import './style.css'

export const CompanyDashboard = () => {
	return (
		<>
			<CompanyHeader />
			<main className='min-h-screen pt-20 anim'>

				<Outlet />
			</main>
		</>
	)
}
