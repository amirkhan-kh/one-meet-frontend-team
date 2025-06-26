import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { interviewAPI } from '@/lib/api'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const InterviewForm = ({ onSuccess, onCancel }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [config, setConfig] = useState(null)
	const [formData, setFormData] = useState({
		candidateName: '',
		email: '',
		role: '',
		interviewType: '',
		language: '',
		duration: 45,
		deadline: '',
		contextPrompt: '',
	})
	useEffect(() => {
		loadConfig()
	}, [])

	const loadConfig = async () => {
		try {
			const configData = await interviewAPI.getInterviewConfig()
			setConfig(configData)

			// Set default values
			if (configData.types.length > 0) {
				setFormData(prev => ({
					...prev,
					interviewType: configData.types[0],
				}))
			}
			if (configData.languages.length > 0) {
				setFormData(prev => ({
					...prev,
					language: configData.languages[0],
				}))
			}
		} catch (error) {
			toast.error('Failed to load interview configuration')
			console.error(error)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const interview = await interviewAPI.createInterview(formData)
			toast.success('Interview created successfully')
			onSuccess?.(interview)
		} catch (error) {
			toast.error('Failed to create interview')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const updateFormData = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	if (!config) {
		return (
			<div className='flex items-center justify-center p-8'>
				<Loader2 className='h-6 w-6 animate-spin' />
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<Label htmlFor='candidateName'>Candidate Name *</Label>
					<Input
						id='candidateName'
						value={formData.candidateName}
						onChange={e =>
							updateFormData('candidateName', e.target.value)
						}
						placeholder='Enter candidate name'
						required
					/>
				</div>

				<div>
					<Label htmlFor='email'>Email *</Label>
					<Input
						id='email'
						type='email'
						value={formData.email}
						onChange={e => updateFormData('email', e.target.value)}
						placeholder='candidate@example.com'
						required
					/>
				</div>

				<div>
					<Label htmlFor='role'>Role *</Label>
					<Input
						id='role'
						value={formData.role}
						onChange={e => updateFormData('role', e.target.value)}
						placeholder='e.g., Senior Developer'
						required
					/>
				</div>

				<div>
					<Label htmlFor='interviewType'>Interview Type *</Label>
					<Select
						value={formData.interviewType}
						onValueChange={value =>
							updateFormData('interviewType', value)
						}
					>
						<SelectTrigger>
							<SelectValue placeholder='Select interview type' />
						</SelectTrigger>
						<SelectContent>
							{config.types.map(type => (
								<SelectItem key={type} value={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label htmlFor='language'>Language *</Label>
					<Select
						value={formData.language}
						onValueChange={value =>
							updateFormData('language', value)
						}
					>
						<SelectTrigger>
							<SelectValue placeholder='Select language' />
						</SelectTrigger>
						<SelectContent>
							{config.languages.map(language => (
								<SelectItem key={language} value={language}>
									{language}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label htmlFor='duration'>Duration (minutes) *</Label>
					<Select
						value={formData.duration.toString()}
						onValueChange={value =>
							updateFormData('duration', Number.parseInt(value))
						}
					>
						<SelectTrigger>
							<SelectValue placeholder='Select duration' />
						</SelectTrigger>
						<SelectContent>
							{config.durations.map(duration => (
								<SelectItem
									key={duration}
									value={duration.toString()}
								>
									{duration} minutes
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='md:col-span-2'>
					<Label htmlFor='deadline'>Deadline *</Label>
					<Input
						id='deadline'
						type='datetime-local'
						value={formData.deadline}
						onChange={e =>
							updateFormData('deadline', e.target.value)
						}
						required
					/>
				</div>

				<div className='md:col-span-2'>
					<Label htmlFor='contextPrompt'>
						Context Prompt (Optional)
					</Label>
					<Textarea
						id='contextPrompt'
						value={formData.contextPrompt}
						onChange={e =>
							updateFormData('contextPrompt', e.target.value)
						}
						placeholder='Additional context or instructions for the interview...'
						rows={4}
					/>
				</div>
			</div>

			<div className='flex justify-end space-x-4'>
				{onCancel && (
					<Button type='button' variant='outline' onClick={onCancel}>
						Cancel
					</Button>
				)}
				<Button type='submit' disabled={isLoading}>
					{isLoading && (
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					)}
					Create Interview
				</Button>
			</div>
		</form>
	)
}
