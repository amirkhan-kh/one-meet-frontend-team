import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MoreHorizontal, TrendingUp, UserCheck, Users } from 'lucide-react'

const RecentActivity = () => {
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
	return (
		<div>
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
		</div>
	)
}

export default RecentActivity
