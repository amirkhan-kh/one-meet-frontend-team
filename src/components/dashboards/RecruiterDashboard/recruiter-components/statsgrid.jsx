import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import {
	Calendar,
	CheckCircle,
	Clock,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import DashboardLoading from './dashboardloading'
import { Badge } from '@/components/ui/badge'

const StatsGrid = () => {
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

	if (isLoading) {
		return <DashboardLoading />
	}
	return (
		<div>
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
								Completed: {stats?.interviews.completed || 0}
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
		</div>
	)
}

export default StatsGrid
