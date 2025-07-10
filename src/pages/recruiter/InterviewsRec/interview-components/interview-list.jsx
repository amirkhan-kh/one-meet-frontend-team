// 📁 src/components/InterviewList.jsx

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Calendar,
	Clock,
	Edit,
	Eye,
	Filter,
	Mail,
	Trash2,
	User,
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { interviewAPI } from '@/lib/api'
import { toast } from 'sonner'

export const InterviewList = ({ onEdit, onView, onDelete, refreshKey }) => {
	const [recruiterId, setRecruiterId] = useState(null)
	const [interviews, setInterviews] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [filters, setFilters] = useState({
		status: 'ALL',
		sortBy: 'createdAt',
		direction: 'desc',
	})

	useEffect(() => {
		setIsLoading(true)
		interviewAPI
			.fetchRecruiterIdAndInterviews(setRecruiterId, setInterviews, filters)
			.catch(err => {
				toast.error('Failed to fetch interviews')
				console.error(err)
			})
			.finally(() => setIsLoading(false))
	}, [refreshKey, filters])

	const updateFilter = (key, value) => {
		setFilters(prev => ({ ...prev, [key]: value }))
	}

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

	if (isLoading) {
		return (
			<div className='space-y-4'>
				{Array.from({ length: 3 }).map((_, i) => (
					<Card key={i}>
						<CardContent className='p-6'>
							<Skeleton className='h-6 w-48 mb-4' />
							<div className='flex items-center space-x-4'>
								<Skeleton className='h-4 w-24' />
								<Skeleton className='h-4 w-32' />
								<Skeleton className='h-8 w-20' />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		)
	}

	return (
		<div className='space-y-6'>
			<Card>
				<CardContent className='p-4'>
					<div className='flex items-center gap-4 flex-wrap'>
						<div className='flex items-center gap-2'>
							<Filter className='h-4 w-4' />
							<span className='text-sm font-medium'>Filters:</span>
						</div>

						<div className='flex items-center gap-2'>
							<span className='text-sm'>Status:</span>
							<Select value={filters.status} onValueChange={val => updateFilter('status', val)}>
								<SelectTrigger className='w-40'>
									<SelectValue placeholder='All Status' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='ALL'>All</SelectItem>
									<SelectItem value='IN_PROGRESS'>In Progress</SelectItem>
									<SelectItem value='COMPLETED'>Completed</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			{interviews.length === 0 ? (
				<Card>
					<CardContent className='p-8 text-center'>
						<Calendar className='h-12 w-12 text-gray-400 mx-auto mb-4' />
						<h3 className='text-lg font-medium text-gray-900 mb-2'>No interviews found</h3>
						<p className='text-gray-600 mb-4'>Create your first interview to get started.</p>
						<Button onClick={() => window.location.reload()} variant='outline'>
							Try again
						</Button>
					</CardContent>
				</Card>
			) : (
				interviews.map(interview => (
					<Card key={interview.id} className='hover:shadow-md transition-shadow'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div className='flex-1'>
									<div className='flex items-center gap-3 mb-3'>
										<h3 className='font-semibold text-gray-900'>{interview.profession}</h3>
										<Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
										<Badge variant='outline'>{interview.type}</Badge>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600'>
										<div className='flex items-center gap-2'>
											<User className='h-4 w-4' />
											<span>
												Candidate ID:{' '}
												{interview.candidateId
													? interview.candidateId.slice(0, 8) + '...'
													: 'N/A'}
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<Mail className='h-4 w-4' />
											<span>Language: {interview.language || 'N/A'}</span>
										</div>
										<div className='flex items-center gap-2'>
											<Clock className='h-4 w-4' />
											<span>{interview.durationMinutes} minutes</span>
										</div>
										<div className='flex items-center gap-2'>
											<Calendar className='h-4 w-4' />
											<span>{new Date(interview.deadline).toLocaleDateString()}</span>
										</div>
									</div>
								</div>

								<div className='lg:flex items-center gap-2 ml-4'>
									<Button variant='outline' size='sm' onClick={() => onView?.(interview)}>
										<Eye className='h-4 w-4' />
									</Button>
									<Button variant='outline' size='sm' onClick={() => onEdit?.(interview)}>
										<Edit className='h-4 w-4' />
									</Button>
									<Button
										variant='outline'
										size='sm'
										onClick={() => onDelete?.(interview)}
										className='text-red-600 hover:text-red-700'
									>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))
			)}
		</div>
	)
}
