import { useEffect, useState } from 'react'

import { MainLayout } from '@/components/dashboards/RecruiterDashboard/components/main-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import {
	Building2,
	Calendar,
	Camera,
	CheckCircle,
	Loader2,
	UserIcon,
	Users,
} from 'lucide-react'
// import { toast } from 'sonner'
import ProfileSkeleton from './components/ProfileSkeleton'

export const ProfilerecruiterRec = () => {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isSaving, setIsSaving] = useState(false)
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	})

	useEffect(() => {
		loadProfile()
	}, [])

	const loadProfile = async () => {
		try {
			setIsLoading(true)
			const userData = await api.user.getProfile()
			setUser(userData)
			setFormData({
				fullName: userData.fullName,
				email: userData.email,
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			})
		} catch (error) {
			// toast.error('Failed to load profile')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSave = async () => {
		if (!user) return

		try {
			setIsSaving(true)

			const updateData = {
				fullName: formData.fullName,
				email: formData.email,
			}

			await api.user.updateProfile(user.id, updateData)
			toast.success('Profile updated successfully')

			// Reset password fields
			setFormData(prev => ({
				...prev,
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			}))
		} catch (error) {
			toast.error('Failed to update profile')
			console.error(error)
		} finally {
			setIsSaving(false)
		}
	}

	const handleReset = () => {
		if (user) {
			setFormData({
				fullName: user.fullName,
				email: user.email,
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			})
		}
	}

	const recentActivities = [
		{
			id: 1,
			type: 'interview',
			title: 'Created a new interview',
			time: '2 hours ago',
			icon: Calendar,
		},
		{
			id: 2,
			type: 'feedback',
			title: 'Added feedback for John Smith',
			time: 'Yesterday',
			icon: Users,
		},
		{
			id: 3,
			type: 'company',
			title: 'Changed company to',
			time: '3 days ago',
			icon: Building2,
		},
	]

	const stats = {
		interviews: 12,
		candidates: 28,
		feedback: 19,
		avgScore: 8.2,
	}

	if (isLoading) {
		return <ProfileSkeleton />
	}

	return (
		<MainLayout>
			<div className='space-y-6'>
				{/* Header */}
				<div>
					<h1 className='text-2xl font-bold text-gray-900'>
						My Profile
					</h1>
					<p className='text-gray-600'>
						Manage your personal information and account settings.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Main Profile Form */}
					<div className='lg:col-span-2 space-y-6'>
						<Card>
							<CardContent className='p-6'>
								{/* Profile Picture Section */}
								<div className='flex items-center space-x-4 mb-6'>
									<div className='relative'>
										<div className='h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center'>
											<UserIcon className='h-10 w-10 text-gray-400' />
										</div>
										<Button
											size='sm'
											variant='outline'
											className='absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0'
										>
											<Camera className='h-4 w-4' />
										</Button>
									</div>
									<div>
										<h3 className='text-lg font-semibold'>
											Recruiter
										</h3>
										<div className='flex items-center space-x-2'>
											<Building2 className='h-4 w-4 text-gray-400' />
											<span className='text-sm text-gray-600'>
												Approval Status:
											</span>
											<Badge
												variant='outline'
												className='bg-green-50 text-green-700 border-green-200'
											>
												<CheckCircle className='h-3 w-3 mr-1' />
												Approved
											</Badge>
										</div>
									</div>
								</div>

								{/* Form Fields */}
								<div className='space-y-4'>
									<div>
										<Label htmlFor='fullName'>
											Full Name
										</Label>
										<Input
											id='fullName'
											value={formData.fullName}
											onChange={e =>
												setFormData(prev => ({
													...prev,
													fullName: e.target.value,
												}))
											}
											placeholder='Type here...'
											className='mt-1'
										/>
									</div>

									<div>
										<Label htmlFor='email'>
											Email Address
										</Label>
										<Input
											id='email'
											type='email'
											value={formData.email}
											onChange={e =>
												setFormData(prev => ({
													...prev,
													email: e.target.value,
												}))
											}
											placeholder='Type here...'
											className='mt-1'
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Password Change Section */}
						<Card>
							<CardHeader>
								<CardTitle>Change Password</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div>
									<Label htmlFor='currentPassword'>
										Current Password
									</Label>
									<Input
										id='currentPassword'
										type='password'
										value={formData.currentPassword}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												currentPassword: e.target.value,
											}))
										}
										placeholder='••••••••'
										className='mt-1'
									/>
								</div>

								<div>
									<Label htmlFor='newPassword'>
										New Password
									</Label>
									<Input
										id='newPassword'
										type='password'
										value={formData.newPassword}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												newPassword: e.target.value,
											}))
										}
										placeholder='••••••••'
										className='mt-1'
									/>
								</div>

								<div>
									<Label htmlFor='confirmPassword'>
										Confirm New Password
									</Label>
									<Input
										id='confirmPassword'
										type='password'
										value={formData.confirmPassword}
										onChange={e =>
											setFormData(prev => ({
												...prev,
												confirmPassword: e.target.value,
											}))
										}
										placeholder='••••••••'
										className='mt-1'
									/>
								</div>
							</CardContent>
						</Card>

						{/* Action Buttons */}
						<div className='flex space-x-4'>
							<Button
								onClick={handleReset}
								variant='outline'
								disabled={isSaving}
							>
								Reset
							</Button>
							<Button
								onClick={handleSave}
								disabled={isSaving}
								className='bg-blue-600 hover:bg-blue-700'
							>
								{isSaving && (
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								)}
								Save Changes
							</Button>
						</div>
					</div>

					{/* Sidebar */}
					<div className='space-y-6'>
						{/* Recent Activity */}
						<Card>
							<CardHeader>
								<CardTitle>Recent Activity</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									{recentActivities.map(activity => (
										<div
											key={activity.id}
											className='flex items-center space-x-3'
										>
											<div className='flex-shrink-0'>
												<activity.icon className='h-5 w-5 text-blue-600' />
											</div>
											<div className='flex-1 min-w-0'>
												<p className='text-sm font-medium text-gray-900'>
													{activity.title}
												</p>
												<p className='text-sm text-gray-500'>
													{activity.time}
												</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Your Statistics */}
						<Card>
							<CardHeader>
								<CardTitle>Your Statistics</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-2 gap-4'>
									<div className='text-center'>
										<div className='text-2xl font-bold text-blue-600'>
											{stats.interviews}
										</div>
										<p className='text-sm text-gray-600'>
											Interviews
										</p>
									</div>
									<div className='text-center'>
										<div className='text-2xl font-bold text-green-600'>
											{stats.candidates}
										</div>
										<p className='text-sm text-gray-600'>
											Candidates
										</p>
									</div>
									<div className='text-center'>
										<div className='text-2xl font-bold text-orange-600'>
											{stats.feedback}
										</div>
										<p className='text-sm text-gray-600'>
											Feedback
										</p>
									</div>
									<div className='text-center'>
										<div className='text-2xl font-bold text-purple-600'>
											{stats.avgScore}
										</div>
										<p className='text-sm text-gray-600'>
											Avg. Score
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
