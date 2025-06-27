import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BarChart3, HelpCircle, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MobileNavigation } from './mobile-navigation'
import { ProfileAvatar } from './profile-avatar'

export const RecruiterDashboardHeader = () => {
	const [user, setUser] = useState({
		name: 'John Doe',
		email: 'john@example.com',
		avatar: undefined,
	})

	const location = useLocation()
	const path = location.pathname

	const getInitials = name => {
		return name
			.split(' ')
			.map(n => n[0])
			.join('')
			.toUpperCase()
	}

	return (
		<header className='border-b bg-white sticky top-0 py-2 z-10'>
			<div className='container mx-auto flex items-center justify-between  py-3'>
				<a href='/' className='text-2xl font-bold text-blue-600'>
					OneMeet
				</a>

				<div className='flex items-center gap-4'>
					{/* Dashboard Link */}
					<NavLink
						to='/recruiter-dashboard/interviews-rec'
						className='hidden md:flex items-center gap-2 px-3 py-2 text-md font-medium text-gray-700 hover:text-blue-600 transition-colors'
					>
						Dashboard
					</NavLink>

					{/* Usage Link */}
					<NavLink
						to='/recruiter-dashboard/usage'
						className='hidden md:flex items-center gap-2 px-3 py-2 text-md font-medium text-gray-700 hover:text-blue-600 transition-colors'
					>
						<BarChart3 className='h-4 w-4' />
						Usage
					</NavLink>

					{/* Help Link */}
					<NavLink
						to='/contact-support'
						className='hidden md:flex items-center gap-2 px-3 py-2 text-md font-medium text-gray-700 hover:text-blue-600 transition-colors'
					>
						<HelpCircle className='h-4 w-4' />
						Help
					</NavLink>

					{/* Profile Dropdown */}
					<div className='flex items-center'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='ghost'
									className='relative h-12 w-12 rounded-full'
								>
									<ProfileAvatar user={user} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-56' align='end'>
								<div className='flex items-center justify-start gap-2 p-2'>
									<div className='flex flex-col space-y-1 leading-none'>
										<p className='font-medium'>
											{user.name}
										</p>
										<p className='text-xs text-muted-foreground'>
											{user.email}
										</p>
									</div>
								</div>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<BarChart3 className='mr-2 h-4 w-4' />
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className='mr-2 h-4 w-4' />
									Settings
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<Link to='/'>
									<DropdownMenuItem className='text-red-600'>
										<LogOut className='mr-2 h-4 w-4' />
										Log out
									</DropdownMenuItem>
								</Link>
							</DropdownMenuContent>
						</DropdownMenu>
						<MobileNavigation currentPath={path} />
					</div>
				</div>
			</div>
		</header>
	)
}
