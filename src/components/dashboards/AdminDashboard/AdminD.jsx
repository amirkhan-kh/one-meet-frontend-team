import { Outlet } from 'react-router-dom'
import { DashboardFooter } from '../../layouts/dashboard-footer'
import { DashboardHeader } from '../../layouts/dashboard-header'
import './style.css'

const AdminDashboard = () => {
	return (
		<>
			<DashboardHeader />
			<main className='min-h-screen pt-20 bg-[#f6f7f9]'>
				AdminD
				<Outlet />
			</main>
			<DashboardFooter />
		</>
	)
}

export default AdminDashboard;
