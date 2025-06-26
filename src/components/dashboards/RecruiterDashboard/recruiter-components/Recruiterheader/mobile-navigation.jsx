import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { navigationAdminDashboard, navigationCandidateDashboard, navigationCompanyDashboard, navigationRecruiterDashboard } from '@/db/navLinks'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'


export const MobileNavigation = ({ currentPath }) => {
	const [isOpen, setIsOpen] = useState(false)

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
		<div className='lg:hidden'>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button variant='ghost' size='icon'>
						<Menu className='h-5 w-5' />
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='w-80'>
					<div className='flex flex-col space-y-4 mt-8'>
						{currentLinks.map((item, i) => (
							<NavLink
								key={i}
								to={item.pathName}
								onClick={() => setIsOpen(false)}
								className={({ isActive }) =>
									`text-sm font-medium transition-colors hover:text-blue-600 p-2 rounded-md ${
										isActive
											? 'text-blue-600 bg-blue-50'
											: 'text-gray-700'
									}`
								}
							>
								{item.navName}
							</NavLink>
						))}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}
