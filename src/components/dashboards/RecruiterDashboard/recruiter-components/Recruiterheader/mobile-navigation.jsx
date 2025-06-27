// import { Button } from '@/components/ui/button'
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
// import { navigationAdminDashboard, navigationCandidateDashboard, navigationCompanyDashboard, navigationRecruiterDashboard } from '@/db/navLinks'
// import { Menu } from 'lucide-react'
// import { useState } from 'react'
// import { NavLink } from 'react-router-dom'

// export const MobileNavigation = ({ currentPath }) => {
// 	const [isOpen, setIsOpen] = useState(false)

// 	let currentLinks = []

// 	switch (true) {
// 		case currentPath.startsWith('/admin-dashboard'):
// 			currentLinks = navigationAdminDashboard
// 			break
// 		case currentPath.startsWith('/company-dashboard'):
// 			currentLinks = navigationCompanyDashboard
// 			break
// 		case currentPath.startsWith('/recruiter-dashboard'):
// 			currentLinks = navigationRecruiterDashboard
// 			break
// 		case currentPath.startsWith('/candidate-dashboard'):
// 			currentLinks = navigationCandidateDashboard
// 			break
// 		default:
// 			currentLinks = []
// 	}

// 	return (
// 		<div className='lg:hidden'>
// 			<Sheet open={isOpen} onOpenChange={setIsOpen}>
// 				<SheetTrigger asChild>
// 					<Button variant='ghost' size='icon'>
// 						<Menu className='h-5 w-5' />
// 					</Button>
// 				</SheetTrigger>
// 				<SheetContent side='left' className='w-80'>
// 					<div className='flex flex-col space-y-4 mt-8'>
// 						{currentLinks.map((item, i) => (
// 							<NavLink
// 								key={i}
// 								to={item.pathName}
// 								onClick={() => setIsOpen(false)}
// 								className={({ isActive }) =>
// 									`text-sm font-medium transition-colors hover:text-blue-600 p-2 rounded-md ${
// 										isActive
// 											? 'text-blue-600 bg-blue-50'
// 											: 'text-gray-700'
// 									}`
// 								}
// 							>
// 								{item.navName}
// 							</NavLink>
// 						))}
// 					</div>
// 				</SheetContent>
// 			</Sheet>
// 		</div>
// 	)
// }

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { BarChart3, HelpCircle, Home, Menu, User } from 'lucide-react'
import { useEffect, useState } from 'react'
// Mock NavLink component for demo purposes
const NavLink = ({ to, onClick, className, children }) => {
	const isActive = to === '/interviews-rec' // Demo: Dashboard is active
	return (
		<a
			href={to}
			onClick={e => {
				e.preventDefault()
				onClick && onClick()
			}}
			className={
				typeof className === 'function'
					? className({ isActive })
					: className
			}
		>
			{typeof children === 'function' ? children({ isActive }) : children}
		</a>
	)
}

export const MobileNavigation = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const staticLinks = [
		{ pathName: '/interviews-rec', navName: 'Dashboard', icon: Home },
		{ pathName: '/contact-support', navName: 'Help', icon: HelpCircle },
		{ pathName: '/profile', navName: 'Profile', icon: User },
		{ pathName: '/usage', navName: 'Usage', icon: BarChart3 },
	]

	const currentLinks = staticLinks

	if (!mounted) return null

	return (
		<div className='lg:hidden'>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button
						variant='ghost'
						size='icon'
						className='relative group hover:bg-gray-50 transition-all duration-300 rounded-full'
					>
						<div className='relative'>
							<Menu
								className={`h-6 w-6 text-gray-700 transition-all duration-300 transform ${
									isOpen
										? 'rotate-90 opacity-0'
										: 'rotate-0 opacity-100'
								}`}
							/>
							<div className='absolute inset-0 bg-blue-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300' />
						</div>
					</Button>
				</SheetTrigger>

				<SheetContent
					side='left'
					className='w-80 border-none bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 backdrop-blur-xl shadow-2xl'
				>
					{/* Header with close button */}
					<div className='flex items-center justify-between mb-8 pt-4'>
						<div className='flex items-center space-x-3'>
							<div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center'>
								<div className='w-4 h-4 bg-white rounded-sm' />
							</div>
							<a
								href='/'
								className='text-2xl font-bold text-blue-600'
							>
								OneMeet
							</a>
						</div>
					</div>

					{/* Navigation Links */}
					<div className='flex flex-col space-y-1 px-2'>
						{currentLinks.map((item, i) => {
							const Icon = item.icon || Home
							return (
								<NavLink
									key={i}
									to={item.pathName}
									onClick={() => setIsOpen(false)}
									className={({ isActive }) =>
										`group relative flex items-center space-x-4 text-[15px] font-medium transition-all duration-300 px-4 py-3.5 rounded-2xl overflow-hidden ${
											isActive
												? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
												: 'text-gray-700 hover:bg-white/70 hover:shadow-md hover:shadow-gray-200/50'
										}`
									}
								>
									{({ isActive }) => (
										<>
											{/* Background animation */}
											<div
												className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 transition-transform duration-300 ${
													isActive
														? 'scale-100'
														: 'scale-0 group-hover:scale-100'
												} rounded-2xl`}
											/>

											{/* Glow effect for active state */}
											{isActive && (
												<div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-30 -z-10' />
											)}

											{/* Icon */}
											<div className='relative z-10'>
												<Icon
													className={`h-5 w-5 transition-all duration-300 ${
														isActive
															? 'text-white'
															: 'text-gray-500 group-hover:text-blue-600'
													}`}
												/>
											</div>

											{/* Text */}
											<span
												className={`relative z-10 transition-all duration-300 ${
													isActive
														? 'text-white font-semibold'
														: 'text-gray-700 group-hover:text-gray-900'
												}`}
											>
												{item.navName}
											</span>

											{/* Active indicator dot */}
											{isActive && (
												<div className='absolute right-4 w-2 h-2 bg-white rounded-full opacity-80' />
											)}
										</>
									)}
								</NavLink>
							)
						})}
					</div>

					{/* Footer */}
					<div className='absolute bottom-6 left-6 right-6'>
						<div className='bg-white/60 backdrop-blur rounded-2xl p-4 border border-gray-200/50'>
							<div className='flex items-center space-x-3'>
								<div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
									<User className='h-5 w-5 text-white' />
								</div>
								<div>
									<p className='text-sm font-medium text-gray-900'>
										Welcome back!
									</p>
									<p className='text-xs text-gray-500'>
										Dashboard Navigation
									</p>
								</div>
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}
