import { useEffect, useState } from 'react'
import { AccountSettings } from './profilerec-components/account-settings'
import { NotificationSettings } from './profilerec-components/notification-settings'
import { PersonalInformation } from './profilerec-components/personal-information'
import { ProfileSidebar } from './profilerec-components/profile-sidebar'
import ProfileSkeleton from './profilerec-components/ProfileSkeleton'

export const ProfilerecruiterRec = () => {
	const [activeTab, setActiveTab] = useState('personal')
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	// Simulate data fetching
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			// Simulate delay (e.g., API call)
			await new Promise(resolve => setTimeout(resolve, 1500))

			// Mock user data
			setUser({
				fullName: 'John Doe',
				email: 'john.doe@example.com',
				bio: '',
				avatar: null,
			})
			setIsLoading(false)
		}

		fetchData()
	}, [])

	const renderContent = () => {
		switch (activeTab) {
			case 'personal':
				return <PersonalInformation user={user} setUser={setUser} />
			case 'account':
				return <AccountSettings />
			case 'notifications':
				return <NotificationSettings />
			default:
				return <PersonalInformation user={user} setUser={setUser} />
		}
	}

	if (isLoading || !user) {
		return <ProfileSkeleton />
	}
 useEffect(() => {
	dispatch(fetchUserProfile());
  }, [dispatch]);
  const navigate = useNavigate();
	return (
		<div className='py-8 bg-gray-50'>
			<div className='max-w-7xl mx-auto px-4 '>
				{/* Header */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						Your Profile
					</h1>
					<p className='text-gray-600'>
						Manage your personal information and account settings
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Sidebar */}
					<div className='lg:col-span-1'>
						<ProfileSidebar
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							user={user}
						/>
					</div>

					{/* Main Content */}
					<div className='lg:col-span-3'>{renderContent()}</div>
				</div>
			</div>
		</div>
	)
}
