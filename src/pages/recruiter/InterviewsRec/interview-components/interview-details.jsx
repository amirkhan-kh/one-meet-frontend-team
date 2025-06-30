import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { interviewAPI } from '@/lib/api'
import {
	Building,
	Calendar,
	Clock,
	FileText,
	Globe,
	Mail,
	User,
} from 'lucide-react'

export const InterviewDetails = ({ interview }) => {
	const getStatusColor = status => {
		switch (status) {
			case 'SCHEDULED':
				return 'bg-blue-100 text-blue-800'
			case 'IN_PROGRESS':
				return 'bg-yellow-100 text-yellow-800'
			case 'COMPLETED':
				return 'bg-green-100 text-green-800'
			case 'CANCELLED':
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
							Candidate
						</Label>
						<div className='flex items-center gap-2 mt-1'>
							<User className='h-4 w-4 text-gray-400' />
							<span className='font-medium'>
								{interview.candidateName || 'N/A'}
							</span>
						</div>
					</div>

					<div>
						<Label className='text-sm font-medium text-gray-500'>
							Email
						</Label>
						<div className='flex items-center gap-2 mt-1'>
							<Mail className='h-4 w-4 text-gray-400' />
							<span>{interview.candidateEmail || 'N/A'}</span>
						</div>
					</div>

					<div>
						<Label className='text-sm font-medium text-gray-500'>
							Profession
						</Label>
						<div className='flex items-center gap-2 mt-1'>
							<FileText className='h-4 w-4 text-gray-400' />
							<span>{interview.profession}</span>
						</div>
					</div>

					<div>
						<Label className='text-sm font-medium text-gray-500'>
							Recruiter
						</Label>
						<div className='flex items-center gap-2 mt-1'>
							<Building className='h-4 w-4 text-gray-400' />
							<span>
								{interview.recruiterName ||
									interview.recruiterId}
							</span>
						</div>
					</div>
				</div>

				<div className='space-y-4'>
					<div>
						<Label className='text-sm font-medium text-gray-500'>
							Interview Type
						</Label>
						<div className='mt-1'>
							<Badge variant='outline'>{interviewAPI.type}</Badge>
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
							<span>{interview.durationMinutes} minutes</span>
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
						Created At
					</Label>
					<div className='flex items-center gap-2 mt-1'>
						<Calendar className='h-4 w-4 text-gray-400' />
						<span>
							{new Date(interview.createdAt).toLocaleString()}
						</span>
					</div>
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

			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-500'>
				<div>
					<span className='font-medium'>Interview ID:</span>{' '}
					{interview.id}
				</div>
				<div>
					<span className='font-medium'>Candidate ID:</span>{' '}
					{interview.candidateId}
				</div>
				<div>
					<span className='font-medium'>Company ID:</span>{' '}
					{interview.companyId}
				</div>
			</div>
		</div>
	)
}
