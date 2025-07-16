import React from 'react'
import InterviewUsageChart from './chart/InterviewUsageChart';
import { PerformanceMetrics } from './preformance-metric'
import { QuickActions } from './quickactions'

export function DashboardPage() {
	const [selectedYear, setSelectedYear] = React.useState('2025')
	const [selectedMonth, setSelectedMonth] = React.useState('01')

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='container mx-auto px-6 py-8 max-w-7xl'>
			<InterviewUsageChart/>
			</div>
		</div>
	)
}
