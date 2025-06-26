import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { interviewAPI } from '@/lib/api'
import { Calendar, Clock, Edit, Eye, Mail, Trash2, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const InterviewList = ({
	recruiterId,
	companyId,
	onEdit,
	onView,
	onDelete,
}) => {
	const [interviews, setInterviews] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		total: 0,
		totalPages: 0,
	})

	useEffect(() => {
		loadInterviews()
	}, [recruiterId, companyId, pagination.page])

	const loadInterviews = async () => {
		try {
			setIsLoading(true)
			let response

			if (recruiterId) {
				response = await interviewAPI.getInterviewsByRecruiter(
					recruiterId,
					pagination.page,
					pagination.limit
				)
			} else if (companyId) {
				response = await interviewAPI.getInterviewsByCompany(
					companyId,
					pagination.page,
					pagination.limit
				)
			} else {
				throw new Error(
					'Either recruiterId or companyId must be provided'
				)
			}

			setInterviews(response.data)
			setPagination(prev => ({
				...prev,
				total: response.total,
				totalPages: response.totalPages,
			}))
		} catch (error) {
			toast.error('Failed to load interviews')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

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

	if (interviews.length === 0) {
		return (
			<Card>
				<CardContent className='p-8 text-center'>
					<Calendar className='h-12 w-12 text-gray-400 mx-auto mb-4' />
					<h3 className='text-lg font-medium text-gray-900 mb-2'>
						No interviews found
					</h3>
					<p className='text-gray-600'>
						Create your first interview to get started.
					</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<div className='space-y-4'>
			{interviews.map(interview => (
				<Card
					key={interview.id}
					className='hover:shadow-md transition-shadow'
				>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='flex-1'>
								<div className='flex items-center gap-3 mb-3'>
									<h3 className='font-semibold text-gray-900'>
										{interview.role}
									</h3>
									<Badge
										className={getStatusColor(
											interview.status
										)}
									>
										{interview.status}
									</Badge>
									<Badge variant='outline'>
										{interview.interviewType}
									</Badge>
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600'>
									<div className='flex items-center gap-2'>
										<User className='h-4 w-4' />
										<span>{interview.candidateName}</span>
									</div>
									<div className='flex items-center gap-2'>
										<Mail className='h-4 w-4' />
										<span>{interview.email}</span>
									</div>
									<div className='flex items-center gap-2'>
										<Clock className='h-4 w-4' />
										<span>
											{interview.duration} minutes
										</span>
									</div>
									<div className='flex items-center gap-2'>
										<Calendar className='h-4 w-4' />
										<span>
											{new Date(
												interview.deadline
											).toLocaleDateString()}
										</span>
									</div>
								</div>
							</div>

							<div className='flex items-center gap-2 ml-4'>
								<Button
									variant='outline'
									size='sm'
									onClick={() => onView?.(interview)}
								>
									<Eye className='h-4 w-4' />
								</Button>
								<Button
									variant='outline'
									size='sm'
									onClick={() => onEdit?.(interview)}
								>
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
			))}

			{pagination.totalPages > 1 && (
				<div className='flex justify-center gap-2 mt-6'>
					<Button
						variant='outline'
						onClick={() =>
							setPagination(prev => ({
								...prev,
								page: prev.page - 1,
							}))
						}
						disabled={pagination.page === 1}
					>
						Previous
					</Button>
					<span className='flex items-center px-4 text-sm text-gray-600'>
						Page {pagination.page} of {pagination.totalPages}
					</span>
					<Button
						variant='outline'
						onClick={() =>
							setPagination(prev => ({
								...prev,
								page: prev.page + 1,
							}))
						}
						disabled={pagination.page === pagination.totalPages}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	)
}
