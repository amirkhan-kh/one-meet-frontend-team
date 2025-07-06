import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const NotificationSettings = () => {
	const [settings, setSettings] = useState({
		newSubmissionNotificationsEnabled: false,
		interviewDeadlineAlertsEnabled: false,
		marketingNotificationsEnabled: false,
	})
	const [isSaving, setIsSaving] = useState(false)

	const handleSave = async () => {
		try {
			setIsSaving(true)
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000))

			toast.success('Notification preferences saved successfully')
		} catch {
			toast.error('Failed to save notification preferences')
		} finally {
			setIsSaving(false)
		}
	}

	const handleCancel = () => {
		setSettings({
			newSubmissionNotificationsEnabled: false,
			interviewDeadlineAlertsEnabled: false,
			marketingNotificationsEnabled: false,
		})
	}

	return (
		<Card className='bg-white border border-gray-200'>
			<CardHeader className='border-b border-gray-100'>
				<CardTitle className='text-xl font-semibold text-gray-900'>
					Notification Settings
				</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='space-y-6'>
					<div className='flex items-start space-x-3'>
						<Checkbox
							id='newSubmissionNotificationsEnabled'
							checked={settings.newSubmissionNotificationsEnabled}
							onCheckedChange={checked =>
								setSettings(prev => ({
									...prev,
									newSubmissionNotificationsEnabled: checked,
								}))
							}
							className='mt-1'
						/>
						<div className='flex-1'>
							<Label
								htmlFor='newSubmissionNotificationsEnabled'
								className='text-sm font-medium text-gray-900'
							>
								New Interview Submissions
							</Label>
							<p className='text-sm text-gray-600 mt-1'>
								Receive a notification when a candidate
								completes their interview.
							</p>
						</div>
					</div>

					<div className='flex items-start space-x-3'>
						<Checkbox
							id='interviewDeadlineAlertsEnabled'
							checked={settings.interviewDeadlineAlertsEnabled}
							onCheckedChange={checked =>
								setSettings(prev => ({
									...prev,
									interviewDeadlineAlertsEnabled: checked,
								}))
							}
							className='mt-1'
						/>
						<div className='flex-1'>
							<Label
								htmlFor='interviewDeadlineAlertsEnabled'
								className='text-sm font-medium text-gray-900'
							>
								Interview Expiration Alerts
							</Label>
							<p className='text-sm text-gray-600 mt-1'>
								Get notified when a candidate hasn't completed
								an interview close to the deadline.
							</p>
						</div>
					</div>

					<div className='flex items-start space-x-3'>
						<Checkbox
							id='marketingNotificationsEnabled'
							checked={settings.marketingNotificationsEnabled}
							onCheckedChange={checked =>
								setSettings(prev => ({
									...prev,
									marketingNotificationsEnabled: checked,
								}))
							}
							className='mt-1'
						/>
						<div className='flex-1'>
							<Label
								htmlFor='marketingNotificationsEnabled'
								className='text-sm font-medium text-gray-900'
							>
								Marketing Notifications
							</Label>
							<p className='text-sm text-gray-600 mt-1'>
								Get notified about new features, promotions, or
								product updates.
							</p>
						</div>
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
							Save Preferences
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
