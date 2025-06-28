import { Outlet } from 'react-router-dom'
import { DashboardFooter } from '../../layouts/dashboard-footer'
import { DashboardHeader } from '../../layouts/dashboard-header'
import './style.css'
import { CompanyHeader } from '@/pages/company/components-compony/header-company'

export const CompanyDashboard = () => {
	return (
		<>
			<CompanyHeader />
			<main className='min-h-screen pt-20 bg-[#f6f7f9]'>
				<Outlet />
			</main>
			<DashboardFooter />
		</>
	)
}
