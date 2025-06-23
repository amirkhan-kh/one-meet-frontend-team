import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const AccountSettings = () => {
	const [formData, setFormData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	})
	const [isSaving, setIsSaving] = useState(false)

	const handleSave = async () => {
		if (formData.newPassword !== formData.confirmPassword) {
			toast.error('New passwords do not match')
			return
		}

		if (formData.newPassword.length < 6) {
			toast.error('Password must be at least 6 characters long')
			return
		}

		try {
			setIsSaving(true)
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000))

			toast.success('Password updated successfully')
			setFormData({
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			})
		} catch {
			toast.error('Failed to update password')
		} finally {
			setIsSaving(false)
		}
	}

	const handleCancel = () => {
		setFormData({
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		})
	}

	return (
		<Card className='bg-white border border-gray-200'>
			<CardHeader className='border-b border-gray-100'>
				<CardTitle className='text-xl font-semibold text-gray-900'>
					Account Settings
				</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='space-y-6'>
					<div>
						<Label
							htmlFor='currentPassword'
							className='text-sm font-medium text-gray-700'
						>
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
							placeholder='Enter your current password'
							className='mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
						/>
					</div>

					<div>
						<Label
							htmlFor='newPassword'
							className='text-sm font-medium text-gray-700'
						>
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
							placeholder='Enter your new password'
							className='mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
						/>
					</div>

					<div>
						<Label
							htmlFor='confirmPassword'
							className='text-sm font-medium text-gray-700'
						>
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
							placeholder='Enter your confirm new password'
							className='mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
						/>
					</div>

					<div className='flex gap-3 pt-4'>
						<Button
							onClick={handleSave}
							disabled={isSaving}
							className='bg-blue-600 hover:bg-blue-700 text-white px-6'
						>
							{isSaving && (
								<Loader2 className='w-4 h-4 mr-2 animate-spin' />
							)}
							Save Changes
						</Button>
						<Button
							onClick={handleCancel}
							variant='outline'
							className='bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
						>
							Cancel
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
