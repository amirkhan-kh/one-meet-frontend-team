import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Calendar, Clock, FileText, Globe, Mail, User } from 'lucide-react'

export const InterviewDetails = ({ interview }) => {
	const getStatusColor = status => {
		switch (status) {
			case 'scheduled':
				return 'bg-blue-100 text-blue-800'
			case 'in-progress':
				return 'bg-yellow-100 text-yellow-800'
			case 'completed':
				return 'bg-green-100 text-green-800'
			case 'cancelled':
				return 'bg-red-100 text-red-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<div className='space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='space-y-4'>
					<div>
						<Label className='text-sm font-medium text-gray-500'>
							Candidate Name
						</Label>
						<div className='flex items-center gap-2 mt-1'>
							<User className='h-4 w-4 text-gray-400' />
							<span className='font-medium'>
								{interview.candidateName}
							</span>
						</div>
					</div>

					<div>
						<Label className='text-sm font-medium text-gray-500'>
							Email
						</Label>
						<div className='flex items-center gap-2 mt-1'>
							<Mail className='h-4 w-4 text-gray-400' />
							<span>{interview.email}</span>
						</div>
					</div>

					<div>
						<Label className='text-sm font-medium text-gray-500'>
							Role
						</Label>
						<div className='flex items-center gap-2 mt-1'>
							<FileText className='h-4 w-4 text-gray-400' />
							<span>{interview.role}</span>
						</div>
					</div>
				</div>

				<div className='space-y-4'>
					<div>
						<Label className='text-sm font-medium text-gray-500'>
							Interview Type
						</Label>
						<div className='mt-1'>
							<Badge variant='outline'>
								{interview.interviewType}
							</Badge>
						</div>
					</div>

					<div>
						<Label className='text-sm font-medium text-gray-500'>
							Language
						</Label>
						<div className='flex items-center gap-2 mt-1'>
							<Globe className='h-4 w-4 text-gray-400' />
							<span>{interview.language}</span>
						</div>
					</div>

					<div>
						<Label className='text-sm font-medium text-gray-500'>
							Duration
						</Label>
						<div className='flex items-center gap-2 mt-1'>
							<Clock className='h-4 w-4 text-gray-400' />
							<span>{interview.duration} minutes</span>
						</div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<Label className='text-sm font-medium text-gray-500'>
						Deadline
					</Label>
					<div className='flex items-center gap-2 mt-1'>
						<Calendar className='h-4 w-4 text-gray-400' />
						<span>
							{new Date(interview.deadline).toLocaleString()}
						</span>
					</div>
				</div>

				<div>
					<Label className='text-sm font-medium text-gray-500'>
						Status
					</Label>
					<div className='mt-1'>
						<Badge className={getStatusColor(interview.status)}>
							{interview.status}
						</Badge>
					</div>
				</div>
			</div>

			<div>
				<Label className='text-sm font-medium text-gray-500'>
					Created At
				</Label>
				<div className='flex items-center gap-2 mt-1'>
					<Calendar className='h-4 w-4 text-gray-400' />
					<span>
						{new Date(interview.createdAt).toLocaleString()}
					</span>
				</div>
			</div>

			{interview.contextPrompt && (
				<div>
					<Label className='text-sm font-medium text-gray-500'>
						Context Prompt
					</Label>
					<div className='mt-1 p-3 bg-gray-50 rounded-md'>
						<p className='text-sm text-gray-700'>
							{interview.contextPrompt}
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
