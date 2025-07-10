import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Camera, User } from 'lucide-react'

export const ProfileSidebar = ({ activeTab, setActiveTab }) => {
	const navItems = [
		{ id: 'personal', label: 'Personal Information' },
		{ id: 'account', label: 'Account Settings' },
		{ id: 'notifications', label: 'Notifications' },
	]

	return (
		<div className='space-y-6'>
			{/* Profile Card */}
			<Card className='p-6 bg-white border border-gray-200'>
				<div className='flex flex-col'>
					<div className='relative inline-block mb-4'>
						<div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto'>
							<User className='w-12 h-12 text-gray-400' />
						</div>
					</div>

					<Button
						variant='outline'
						size='sm'
						className='mb-4 bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
					>
						<Camera className='w-4 h-4 mr-2' />
						Upload Photo
					</Button>

					<div className='text-center'>
						<p className='font-medium text-gray-900'>
							ProfileRecruiter
						</p>
					</div>
				</div>
			</Card>

			{/* Navigation */}
			<Card className='bg-white border border-gray-200'>
				<div className='p-2'>
					{navItems.map(item => (
						<button
							key={item.id}
							onClick={() => setActiveTab(item.id)}
							className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
								activeTab === item.id
									? 'bg-blue-50 text-blue-700 border border-blue-200'
									: 'text-gray-700 hover:bg-gray-50'
							}`}
						>
							{item.label}
						</button>
					))}
				</div>
			</Card>
		</div>
	)
}
