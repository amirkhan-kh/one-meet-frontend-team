import {
	navigationAdminDashboard,
	navigationCandidateDashboard,
	navigationCompanyDashboard,
	navigationRecruiterDashboard,
} from '@/db/navLinks'
import { NavLink } from 'react-router-dom'

export const DesktopNavigation = ({ currentPath }) => {
	let currentLinks = []

	switch (true) {
		case currentPath.startsWith('/admin-dashboard'):
			currentLinks = navigationAdminDashboard
			break
		case currentPath.startsWith('/company-dashboard'):
			currentLinks = navigationCompanyDashboard
			break
		case currentPath.startsWith('/recruiter-dashboard'):
			currentLinks = navigationRecruiterDashboard
			break
		case currentPath.startsWith('/candidate-dashboard'):
			currentLinks = navigationCandidateDashboard
			break
		default:
			currentLinks = []
	}

	return (
		<nav className='hidden lg:block'>
			<ul className='flex items-center gap-6'>
				{currentLinks.map((item, i) => (
					<NavLink
						key={i}
						to={item.pathName}
						className={({ isActive }) =>
							`text-sm font-medium transition-colors hover:text-blue-600 ${
								isActive ? 'text-blue-600' : 'text-gray-700'
							}`
						}
					>
						<li>{item.navName}</li>
					</NavLink>
				))}
			</ul>
		</nav>
	)
}
