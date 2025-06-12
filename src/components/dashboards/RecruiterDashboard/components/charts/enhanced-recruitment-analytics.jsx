import {
	Area,
	AreaChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'

import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Calendar,
	CheckCircle,
	Clock,
	TrendingDown,
	TrendingUp,
	Users,
} from 'lucide-react'
import React from 'react'

const chartData = [
	{
		date: '2024-06-01',
		interviews: 12,
		candidates: 8,
		feedback: 5,
		hired: 2,
	},
	{
		date: '2024-06-02',
		interviews: 15,
		candidates: 12,
		feedback: 8,
		hired: 3,
	},
	{ date: '2024-06-03', interviews: 8, candidates: 6, feedback: 4, hired: 1 },
	{
		date: '2024-06-04',
		interviews: 18,
		candidates: 15,
		feedback: 12,
		hired: 4,
	},
	{
		date: '2024-06-05',
		interviews: 22,
		candidates: 18,
		feedback: 15,
		hired: 5,
	},
	{
		date: '2024-06-06',
		interviews: 16,
		candidates: 14,
		feedback: 10,
		hired: 3,
	},
	{
		date: '2024-06-07',
		interviews: 10,
		candidates: 8,
		feedback: 6,
		hired: 2,
	},
	{
		date: '2024-06-08',
		interviews: 25,
		candidates: 20,
		feedback: 18,
		hired: 6,
	},
	{ date: '2024-06-09', interviews: 5, candidates: 4, feedback: 2, hired: 1 },
	{
		date: '2024-06-10',
		interviews: 14,
		candidates: 11,
		feedback: 8,
		hired: 3,
	},
	{
		date: '2024-06-11',
		interviews: 19,
		candidates: 16,
		feedback: 13,
		hired: 4,
	},
	{
		date: '2024-06-12',
		interviews: 13,
		candidates: 10,
		feedback: 7,
		hired: 2,
	},
	{
		date: '2024-06-13',
		interviews: 21,
		candidates: 17,
		feedback: 14,
		hired: 5,
	},
	{ date: '2024-06-14', interviews: 9, candidates: 7, feedback: 5, hired: 1 },
	{
		date: '2024-06-15',
		interviews: 11,
		candidates: 9,
		feedback: 6,
		hired: 2,
	},
	{
		date: '2024-06-16',
		interviews: 17,
		candidates: 14,
		feedback: 11,
		hired: 4,
	},
	{
		date: '2024-06-17',
		interviews: 24,
		candidates: 19,
		feedback: 16,
		hired: 6,
	},
	{
		date: '2024-06-18',
		interviews: 20,
		candidates: 16,
		feedback: 13,
		hired: 4,
	},
	{
		date: '2024-06-19',
		interviews: 12,
		candidates: 10,
		feedback: 7,
		hired: 2,
	},
	{ date: '2024-06-20', interviews: 7, candidates: 5, feedback: 3, hired: 1 },
	{
		date: '2024-06-21',
		interviews: 16,
		candidates: 13,
		feedback: 10,
		hired: 3,
	},
	{
		date: '2024-06-22',
		interviews: 14,
		candidates: 11,
		feedback: 8,
		hired: 3,
	},
	{
		date: '2024-06-23',
		interviews: 18,
		candidates: 15,
		feedback: 12,
		hired: 4,
	},
	{
		date: '2024-06-24',
		interviews: 23,
		candidates: 18,
		feedback: 15,
		hired: 5,
	},
	{
		date: '2024-06-25',
		interviews: 15,
		candidates: 12,
		feedback: 9,
		hired: 3,
	},
	{ date: '2024-06-26', interviews: 8, candidates: 6, feedback: 4, hired: 1 },
	{
		date: '2024-06-27',
		interviews: 26,
		candidates: 21,
		feedback: 18,
		hired: 7,
	},
	{
		date: '2024-06-28',
		interviews: 11,
		candidates: 9,
		feedback: 6,
		hired: 2,
	},
	{
		date: '2024-06-29',
		interviews: 19,
		candidates: 15,
		feedback: 12,
		hired: 4,
	},
	{
		date: '2024-06-30',
		interviews: 27,
		candidates: 22,
		feedback: 19,
		hired: 8,
	},
]

const statusData = [
	{ name: 'Active', value: 45, color: '#10B981' },
	{ name: 'Selected', value: 23, color: '#3B82F6' },
	{ name: 'Pending', value: 18, color: '#F59E0B' },
	{ name: 'Rejected', value: 14, color: '#EF4444' },
]

const performanceData = [
	{ month: 'Jan', hireRate: 15, interviewRate: 65, responseRate: 85 },
	{ month: 'Feb', hireRate: 18, interviewRate: 70, responseRate: 88 },
	{ month: 'Mar', hireRate: 22, interviewRate: 75, responseRate: 90 },
	{ month: 'Apr', hireRate: 25, interviewRate: 78, responseRate: 92 },
	{ month: 'May', hireRate: 28, interviewRate: 80, responseRate: 94 },
	{ month: 'Jun', hireRate: 30, interviewRate: 82, responseRate: 95 },
]

const chartConfig = {
	interviews: {
		label: 'Interviews',
		color: '#8B5CF6',
	},
	candidates: {
		label: 'Candidates',
		color: '#06B6D4',
	},
	feedback: {
		label: 'Feedback',
		color: '#F59E0B',
	},
	hired: {
		label: 'Hired',
		color: '#10B981',
	},
}

const performanceConfig = {
	hireRate: {
		label: 'Hire Rate %',
		color: '#10B981',
	},
	interviewRate: {
		label: 'Interview Rate %',
		color: '#3B82F6',
	},
	responseRate: {
		label: 'Response Rate %',
		color: '#F59E0B',
	},
}

export function EnhancedRecruitmentAnalytics() {
	const [timeRange, setTimeRange] = React.useState('30d')

	const filteredData = chartData.filter(item => {
		const date = new Date(item.date)
		const referenceDate = new Date('2024-06-30')
		let daysToSubtract = 30
		if (timeRange === '90d') {
			daysToSubtract = 90
		} else if (timeRange === '7d') {
			daysToSubtract = 7
		}
		const startDate = new Date(referenceDate)
		startDate.setDate(startDate.getDate() - daysToSubtract)
		return date >= startDate
	})

	const totalInterviews = filteredData.reduce(
		(sum, item) => sum + item.interviews,
		0
	)
	const totalCandidates = filteredData.reduce(
		(sum, item) => sum + item.candidates,
		0
	)
	const totalHired = filteredData.reduce((sum, item) => sum + item.hired, 0)
	const hireRate =
		totalCandidates > 0
			? ((totalHired / totalCandidates) * 100).toFixed(1)
			: '0'

	return (
		<div className='space-y-6'>
			{/* KPI Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				<Card className='border-l-4 border-l-purple-500'>
					<CardContent className='p-4'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>
									Total Interviews
								</p>
								<p className='text-2xl font-bold text-purple-600'>
									{totalInterviews}
								</p>
								<div className='flex items-center mt-1'>
									<TrendingUp className='w-4 h-4 text-green-500 mr-1' />
									<span className='text-sm text-green-500'>
										+12%
									</span>
								</div>
							</div>
							<Calendar className='w-8 h-8 text-purple-500' />
						</div>
					</CardContent>
				</Card>

				<Card className='border-l-4 border-l-cyan-500'>
					<CardContent className='p-4'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>
									Total Candidates
								</p>
								<p className='text-2xl font-bold text-cyan-600'>
									{totalCandidates}
								</p>
								<div className='flex items-center mt-1'>
									<TrendingUp className='w-4 h-4 text-green-500 mr-1' />
									<span className='text-sm text-green-500'>
										+8%
									</span>
								</div>
							</div>
							<Users className='w-8 h-8 text-cyan-500' />
						</div>
					</CardContent>
				</Card>

				<Card className='border-l-4 border-l-green-500'>
					<CardContent className='p-4'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>
									Hired
								</p>
								<p className='text-2xl font-bold text-green-600'>
									{totalHired}
								</p>
								<div className='flex items-center mt-1'>
									<TrendingUp className='w-4 h-4 text-green-500 mr-1' />
									<span className='text-sm text-green-500'>
										+15%
									</span>
								</div>
							</div>
							<CheckCircle className='w-8 h-8 text-green-500' />
						</div>
					</CardContent>
				</Card>

				<Card className='border-l-4 border-l-amber-500'>
					<CardContent className='p-4'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>
									Hire Rate
								</p>
								<p className='text-2xl font-bold text-amber-600'>
									{hireRate}%
								</p>
								<div className='flex items-center mt-1'>
									<TrendingDown className='w-4 h-4 text-red-500 mr-1' />
									<span className='text-sm text-red-500'>
										-2%
									</span>
								</div>
							</div>
							<Clock className='w-8 h-8 text-amber-500' />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Main Analytics Chart */}
			<Card>
				<CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
					<div className='grid flex-1 gap-1'>
						<CardTitle className='text-xl'>
							Recruitment Analytics
						</CardTitle>
						<CardDescription>
							Showing recruitment activities for the selected
							period
						</CardDescription>
					</div>
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger
							className='w-[160px] rounded-lg sm:ml-auto'
							aria-label='Select a value'
						>
							<SelectValue placeholder='Last 30 days' />
						</SelectTrigger>
						<SelectContent className='rounded-xl'>
							<SelectItem value='90d' className='rounded-lg'>
								Last 3 months
							</SelectItem>
							<SelectItem value='30d' className='rounded-lg'>
								Last 30 days
							</SelectItem>
							<SelectItem value='7d' className='rounded-lg'>
								Last 7 days
							</SelectItem>
						</SelectContent>
					</Select>
				</CardHeader>
				<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
					<ChartContainer
						config={chartConfig}
						className='aspect-auto h-[300px] w-full'
					>
						<ResponsiveContainer width='100%' height='100%'>
							<AreaChart data={filteredData}>
								<defs>
									<linearGradient
										id='fillInterviews'
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop
											offset='5%'
											stopColor='var(--color-interviews)'
											stopOpacity={0.8}
										/>
										<stop
											offset='95%'
											stopColor='var(--color-interviews)'
											stopOpacity={0.1}
										/>
									</linearGradient>
									<linearGradient
										id='fillCandidates'
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop
											offset='5%'
											stopColor='var(--color-candidates)'
											stopOpacity={0.8}
										/>
										<stop
											offset='95%'
											stopColor='var(--color-candidates)'
											stopOpacity={0.1}
										/>
									</linearGradient>
									<linearGradient
										id='fillFeedback'
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop
											offset='5%'
											stopColor='var(--color-feedback)'
											stopOpacity={0.8}
										/>
										<stop
											offset='95%'
											stopColor='var(--color-feedback)'
											stopOpacity={0.1}
										/>
									</linearGradient>
									<linearGradient
										id='fillHired'
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop
											offset='5%'
											stopColor='var(--color-hired)'
											stopOpacity={0.8}
										/>
										<stop
											offset='95%'
											stopColor='var(--color-hired)'
											stopOpacity={0.1}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray='3 3'
									stroke='#f0f0f0'
								/>
								<XAxis
									dataKey='date'
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									minTickGap={32}
									tickFormatter={value => {
										const date = new Date(value)
										return date.toLocaleDateString(
											'en-US',
											{
												month: 'short',
												day: 'numeric',
											}
										)
									}}
								/>
								<YAxis tickLine={false} axisLine={false} />
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											labelFormatter={value => {
												return new Date(
													value
												).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
												})
											}}
											indicator='dot'
										/>
									}
								/>
								<Area
									dataKey='hired'
									type='natural'
									fill='url(#fillHired)'
									stroke='var(--color-hired)'
									stackId='a'
									strokeWidth={2}
								/>
								<Area
									dataKey='feedback'
									type='natural'
									fill='url(#fillFeedback)'
									stroke='var(--color-feedback)'
									stackId='a'
									strokeWidth={2}
								/>
								<Area
									dataKey='candidates'
									type='natural'
									fill='url(#fillCandidates)'
									stroke='var(--color-candidates)'
									stackId='a'
									strokeWidth={2}
								/>
								<Area
									dataKey='interviews'
									type='natural'
									fill='url(#fillInterviews)'
									stroke='var(--color-interviews)'
									stackId='a'
									strokeWidth={2}
								/>
								<ChartLegend content={<ChartLegendContent />} />
							</AreaChart>
						</ResponsiveContainer>
					</ChartContainer>
				</CardContent>
			</Card>

			{/* Secondary Charts */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Candidate Status Distribution */}
				<Card>
					<CardHeader>
						<CardTitle className='text-lg'>
							Candidate Status Distribution
						</CardTitle>
						<CardDescription>
							Current status breakdown of all candidates
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex items-center justify-center'>
							<ResponsiveContainer width='100%' height={250}>
								<PieChart>
									<Pie
										data={statusData}
										cx='50%'
										cy='50%'
										innerRadius={60}
										outerRadius={100}
										paddingAngle={5}
										dataKey='value'
									>
										{statusData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={entry.color}
											/>
										))}
									</Pie>
									<ChartTooltip
										content={({ active, payload }) => {
											if (
												active &&
												payload &&
												payload.length
											) {
												const data = payload[0].payload
												return (
													<div className='bg-white p-3 border rounded-lg shadow-lg'>
														<p className='font-medium'>
															{data.name}
														</p>
														<p className='text-sm text-gray-600'>
															{data.value}{' '}
															candidates
														</p>
													</div>
												)
											}
											return null
										}}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
						<div className='flex flex-wrap justify-center gap-4 mt-4'>
							{statusData.map((item, index) => (
								<div
									key={index}
									className='flex items-center gap-2'
								>
									<div
										className='w-3 h-3 rounded-full'
										style={{ backgroundColor: item.color }}
									/>
									<span className='text-sm font-medium'>
										{item.name}
									</span>
									<Badge
										variant='secondary'
										className='cursor-pointer hover:bg-gray-200'
									>
										{item.value}
									</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Performance Metrics */}
				<Card>
					<CardHeader>
						<CardTitle className='text-lg'>
							Performance Metrics
						</CardTitle>
						<CardDescription>
							Monthly performance trends
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={performanceConfig}
							className='h-[250px]'
						>
							<ResponsiveContainer width='100%' height='100%'>
								<LineChart data={performanceData}>
									<CartesianGrid
										strokeDasharray='3 3'
										stroke='#f0f0f0'
									/>
									<XAxis
										dataKey='month'
										tickLine={false}
										axisLine={false}
									/>
									<YAxis tickLine={false} axisLine={false} />
									<ChartTooltip
										content={
											<ChartTooltipContent
												formatter={(value, name) => [
													`${value}%`,
													name,
												]}
												indicator='line'
											/>
										}
									/>
									<Line
										type='monotone'
										dataKey='hireRate'
										stroke='var(--color-hireRate)'
										strokeWidth={3}
										dot={{
											fill: 'var(--color-hireRate)',
											strokeWidth: 2,
											r: 4,
										}}
									/>
									<Line
										type='monotone'
										dataKey='interviewRate'
										stroke='var(--color-interviewRate)'
										strokeWidth={3}
										dot={{
											fill: 'var(--color-interviewRate)',
											strokeWidth: 2,
											r: 4,
										}}
									/>
									<Line
										type='monotone'
										dataKey='responseRate'
										stroke='var(--color-responseRate)'
										strokeWidth={3}
										dot={{
											fill: 'var(--color-responseRate)',
											strokeWidth: 2,
											r: 4,
										}}
									/>
									<ChartLegend
										content={<ChartLegendContent />}
									/>
								</LineChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
