import React from 'react'
import { InterviewCharts } from './charts/enhanced-recruitment-analytics'
import { PerformanceMetrics } from './preformance-metric'
import { QuickActions } from './quickactions'
import { UsageSummary } from './usage-summary'

export function DashboardPage() {
	const [selectedYear, setSelectedYear] = React.useState('2025')
	const [selectedMonth, setSelectedMonth] = React.useState('01')

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='container mx-auto px-6 py-8 max-w-7xl'>
				{/* Header */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900'>
						Interview Analytics
					</h1>
					<p className='text-gray-600 mt-1'>
						Advanced recruitment insights dashboard
					</p>
				</div>

				{/* Usage Summary */}
				<UsageSummary
					selectedYear={selectedYear}
					selectedMonth={selectedMonth}
					onYearChange={setSelectedYear}
					onMonthChange={setSelectedMonth}
				/>

				{/* Main Content Grid */}
				<div className='grid grid-cols-1 xl:grid-cols-4 gap-6 mt-8'>
					{/* Charts Section */}
					<div className='xl:col-span-3 space-y-6'>
						<InterviewCharts
							selectedYear={selectedYear}
							selectedMonth={selectedMonth}
						/>
						<PerformanceMetrics />
					</div>

					{/* Sidebar */}
					<div className='xl:col-span-1'>
						<QuickActions />
					</div>
				</div>
			</div>
		</div>
	)
}
