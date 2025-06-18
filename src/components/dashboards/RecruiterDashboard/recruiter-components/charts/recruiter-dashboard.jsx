import { MainLayout } from '../main-layout'
import Quickactions from '../quickactions'
import RecentActivity from '../recentactivity'
import StatsGrid from '../statsgrid'
import TopCandidates from '../topcandidates'
import { EnhancedRecruitmentAnalytics } from './enhanced-recruitment-analytics'


export const RecDashboardPage = () => {
	return (
		<MainLayout>
			<div className='space-y-6'>
				<div>
					<h1 className='text-2xl font-bold text-gray-900'>
						Welcome back!
					</h1>
					<p className='text-gray-600'>
						Here's what's happening with your recruitment activities
					</p>
				</div>

				{/* Stats Grid */}
				<StatsGrid />

				{/* Main Content Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Recent Activity */}
					<RecentActivity />
					{/* Top Candidates */}
					<TopCandidates />
				</div>

				{/* Enhanced Analytics Chart */}
				<EnhancedRecruitmentAnalytics />
				{/* Quick Actions */}
				<Quickactions />
			</div>
		</MainLayout>
	)
}
