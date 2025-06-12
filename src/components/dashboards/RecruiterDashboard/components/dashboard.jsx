// import { EnhancedRecruitmentAnalytics } from '@/components/charts/enhanced-recruitment-analytics'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { api } from '@/lib/api'
import {
	Calendar,
	CheckCircle,
	Clock,
	MoreHorizontal,
	Star,
	TrendingUp,
	UserCheck,
	Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { EnhancedRecruitmentAnalytics } from './charts/enhanced-recruitment-analytics'
import { MainLayout } from './main-layout'

export default function DashboardPage() {
	const [stats, setStats] = useState(null)
	const [candidates, setCandidates] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		loadDashboardData()
	}, [])

	const loadDashboardData = async () => {
		try {
			setIsLoading(true)

			// Fetch candidates data
			const candidatesData = await api.candidate.getAll()
			setCandidates(candidatesData)

			// Calculate stats from candidates data
			const candidateStats = {
				active: candidatesData.filter(c => c.status === 'active')
					.length,
				selected: candidatesData.filter(c => c.status === 'selected')
					.length,
				rejected: candidatesData.filter(c => c.status === 'rejected')
					.length,
				pending: candidatesData.filter(c => c.status === 'pending')
					.length,
			}

			// Mock interview stats (you can replace with actual API call)
			const interviewStats = {
				scheduled: 12,
				completed: 8,
				upcoming: 5,
			}

			setStats({
				interviews: interviewStats,
				candidates: candidateStats,
			})
		} catch (error) {
			toast.error('Failed to load dashboard data')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const recentActivities = [
		{
			id: 1,
			type: 'interview',
			title: 'Created a new interview',
			time: '2 hours ago',
			icon: Calendar,
			color: 'text-blue-600',
		},
		{
			id: 2,
			type: 'feedback',
			title: 'Added feedback for John Smith',
			time: 'Yesterday',
			icon: Users,
			color: 'text-green-600',
		},
		{
			id: 3,
			type: 'company',
			title: 'Changed company to TechCorp',
			time: '3 days ago',
			icon: TrendingUp,
			color: 'text-purple-600',
		},
		{
			id: 4,
			type: 'candidate',
			title: 'New candidate application received',
			time: '1 week ago',
			icon: UserCheck,
			color: 'text-orange-600',
		},
	]

	const topCandidates = candidates.slice(0, 5).map(candidate => ({
		...candidate,
		rating: Math.floor(Math.random() * 2) + 4, // Mock rating 4-5
	}))

	if (isLoading) {
		return (
			<MainLayout>
				<div className='space-y-6'>
					<div>
						<Skeleton className='h-8 w-48 mb-2' />
						<Skeleton className='h-4 w-96' />
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{Array.from({ length: 4 }).map((_, i) => (
							<Card key={i}>
								<CardContent className='p-6'>
									<Skeleton className='h-4 w-16 mb-2' />
									<Skeleton className='h-8 w-12 mb-1' />
									<Skeleton className='h-3 w-20' />
								</CardContent>
							</Card>
						))}
					</div>

					<Skeleton className='h-96 w-full' />
				</div>
			</MainLayout>
		)
	}

	return (
		<MainLayout>
			<div className='space-y-6'>
				{/* Header */}
				<div>
					<h1 className='text-2xl font-bold text-gray-900'>
						Welcome back!
					</h1>
					<p className='text-gray-600'>
						Here's what's happening with your recruitment activities
					</p>
				</div>

				{/* Stats Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{/* Total Candidates */}
					<Card className='border-l-4 border-l-blue-500 hover:shadow-md transition-shadow cursor-pointer'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium text-gray-600'>
								Total Candidates
							</CardTitle>
							<Users className='h-5 w-5 text-blue-500' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold text-blue-600'>
								{candidates.length}
							</div>
							<div className='flex items-center mt-1'>
								<TrendingUp className='w-4 h-4 text-green-500 mr-1' />
								<span className='text-xs text-green-500'>
									+12% from last month
								</span>
							</div>
							<div className='flex gap-1 mt-2'>
								<Badge
									variant='secondary'
									className='text-xs cursor-pointer hover:bg-gray-200'
									title='Active candidates'
								>
									Active: {stats?.candidates.active || 0}
								</Badge>
								<Badge
									variant='secondary'
									className='text-xs cursor-pointer hover:bg-gray-200'
									title='Selected candidates'
								>
									Selected: {stats?.candidates.selected || 0}
								</Badge>
							</div>
						</CardContent>
					</Card>

					{/* Interviews */}
					<Card className='border-l-4 border-l-green-500 hover:shadow-md transition-shadow cursor-pointer'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium text-gray-600'>
								Interviews
							</CardTitle>
							<Calendar className='h-5 w-5 text-green-500' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold text-green-600'>
								{stats?.interviews.scheduled || 0}
							</div>
							<div className='flex items-center mt-1'>
								<Clock className='w-4 h-4 text-orange-500 mr-1' />
								<span className='text-xs text-orange-500'>
									{stats?.interviews.upcoming || 0} upcoming
								</span>
							</div>
							<div className='flex gap-1 mt-2'>
								<Badge
									variant='secondary'
									className='text-xs cursor-pointer hover:bg-gray-200'
									title='Completed interviews'
								>
									Completed:{' '}
									{stats?.interviews.completed || 0}
								</Badge>
							</div>
						</CardContent>
					</Card>

					{/* Success Rate */}
					<Card className='border-l-4 border-l-purple-500 hover:shadow-md transition-shadow cursor-pointer'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium text-gray-600'>
								Success Rate
							</CardTitle>
							<CheckCircle className='h-5 w-5 text-purple-500' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold text-purple-600'>
								{candidates.length > 0
									? Math.round(
											((stats?.candidates.selected || 0) /
												candidates.length) *
												100
									  )
									: 0}
								%
							</div>
							<div className='flex items-center mt-1'>
								<TrendingUp className='w-4 h-4 text-green-500 mr-1' />
								<span className='text-xs text-green-500'>
									+5% improvement
								</span>
							</div>
							<div className='flex gap-1 mt-2'>
								<Badge
									variant='secondary'
									className='text-xs cursor-pointer hover:bg-gray-200'
									title='Pending candidates'
								>
									Pending: {stats?.candidates.pending || 0}
								</Badge>
							</div>
						</CardContent>
					</Card>

					{/* Average Rating */}
					<Card className='border-l-4 border-l-orange-500 hover:shadow-md transition-shadow cursor-pointer'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium text-gray-600'>
								Avg. Rating
							</CardTitle>
							<Star className='h-5 w-5 text-orange-500' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold text-orange-600'>
								4.2
							</div>
							<div className='flex items-center mt-1'>
								<div className='flex'>
									{Array.from({ length: 5 }, (_, i) => (
										<Star
											key={i}
											className={`w-3 h-3 ${
												i < 4
													? 'text-orange-400 fill-current'
													: 'text-gray-300'
											}`}
										/>
									))}
								</div>
							</div>
							<div className='flex gap-1 mt-2'>
								<Badge
									variant='secondary'
									className='text-xs cursor-pointer hover:bg-gray-200'
									title='Based on candidate feedback'
								>
									From {candidates.length} reviews
								</Badge>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Main Content Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Recent Activity */}
					<Card className='lg:col-span-1'>
						<CardHeader className='flex flex-row items-center justify-between'>
							<CardTitle className='text-lg font-semibold'>
								Recent Activity
							</CardTitle>
							<Button
								variant='ghost'
								size='sm'
								className='cursor-pointer hover:bg-gray-100'
							>
								<MoreHorizontal className='h-4 w-4' />
							</Button>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								{recentActivities.map(activity => (
									<div
										key={activity.id}
										className='flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'
									>
										<div className='flex-shrink-0'>
											<activity.icon
												className={`h-5 w-5 ${activity.color}`}
											/>
										</div>
										<div className='flex-1 min-w-0'>
											<p className='text-sm font-medium text-gray-900 truncate'>
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

					{/* Top Candidates */}
					<Card className='lg:col-span-2'>
						<CardHeader>
							<CardTitle className='text-lg font-semibold'>
								Top Candidates
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-3'>
								{topCandidates.map(candidate => (
									<div
										key={candidate.id}
										className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'
									>
										<div className='flex items-center space-x-3'>
											<div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold'>
												{candidate.name
													.split(' ')
													.map(n => n[0])
													.join('')}
											</div>
											<div>
												<p className='text-sm font-medium text-gray-900'>
													{candidate.name}
												</p>
												<p className='text-sm text-gray-500'>
													{candidate.position ||
														'Developer'}
												</p>
											</div>
										</div>
										<div className='flex items-center space-x-2'>
											<div className='flex'>
												{Array.from(
													{ length: 5 },
													(_, i) => (
														<Star
															key={i}
															className={`w-4 h-4 ${
																i <
																candidate.rating
																	? 'text-yellow-400 fill-current'
																	: 'text-gray-300'
															}`}
														/>
													)
												)}
											</div>
											<Badge
												variant='outline'
												className={`text-xs cursor-pointer hover:bg-gray-200 ${
													candidate.status ===
													'selected'
														? 'bg-blue-100 text-blue-800 border-blue-200'
														: candidate.status ===
														  'active'
														? 'bg-green-100 text-green-800 border-green-200'
														: candidate.status ===
														  'pending'
														? 'bg-yellow-100 text-yellow-800 border-yellow-200'
														: 'bg-red-100 text-red-800 border-red-200'
												}`}
												title={`Status: ${candidate.status}`}
											>
												{candidate.status}
											</Badge>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Enhanced Analytics Chart */}
				<EnhancedRecruitmentAnalytics />

				{/* Quick Actions */}
				<Card>
					<CardHeader>
						<CardTitle className='text-lg font-semibold'>
							Quick Actions
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<Button
								className='h-16 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-blue-50 transition-colors'
								variant='outline'
							>
								<Calendar className='h-6 w-6 text-blue-600' />
								<span className='text-sm font-medium'>
									Schedule Interview
								</span>
							</Button>
							<Button
								className='h-16 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-green-50 transition-colors'
								variant='outline'
							>
								<Users className='h-6 w-6 text-green-600' />
								<span className='text-sm font-medium'>
									Add Candidate
								</span>
							</Button>
							<Button
								className='h-16 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-purple-50 transition-colors'
								variant='outline'
							>
								<CheckCircle className='h-6 w-6 text-purple-600' />
								<span className='text-sm font-medium'>
									Review Feedback
								</span>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</MainLayout>
	)
}
