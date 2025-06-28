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
import React from 'react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'

// Extended data for multiple months and years
const allChartData = {
	2025: {
		'01': [
			{
				date: '2025-01-01',
				interviews: 12,
				candidates: 8,
				feedback: 5,
				hired: 2,
			},
			{
				date: '2025-01-02',
				interviews: 15,
				candidates: 12,
				feedback: 8,
				hired: 3,
			},
			{
				date: '2025-01-03',
				interviews: 8,
				candidates: 6,
				feedback: 4,
				hired: 1,
			},
			{
				date: '2025-01-04',
				interviews: 18,
				candidates: 15,
				feedback: 12,
				hired: 4,
			},
			{
				date: '2025-01-05',
				interviews: 22,
				candidates: 18,
				feedback: 15,
				hired: 5,
			},
			{
				date: '2025-01-06',
				interviews: 16,
				candidates: 14,
				feedback: 10,
				hired: 3,
			},
			{
				date: '2025-01-07',
				interviews: 10,
				candidates: 8,
				feedback: 6,
				hired: 2,
			},
			{
				date: '2025-01-08',
				interviews: 25,
				candidates: 20,
				feedback: 18,
				hired: 6,
			},
			{
				date: '2025-01-09',
				interviews: 5,
				candidates: 4,
				feedback: 2,
				hired: 1,
			},
			{
				date: '2025-01-10',
				interviews: 14,
				candidates: 11,
				feedback: 8,
				hired: 3,
			},
		],
		'02': [
			{
				date: '2025-02-01',
				interviews: 20,
				candidates: 16,
				feedback: 12,
				hired: 4,
			},
			{
				date: '2025-02-02',
				interviews: 18,
				candidates: 14,
				feedback: 10,
				hired: 3,
			},
			{
				date: '2025-02-03',
				interviews: 24,
				candidates: 19,
				feedback: 15,
				hired: 5,
			},
			{
				date: '2025-02-04',
				interviews: 16,
				candidates: 13,
				feedback: 9,
				hired: 2,
			},
			{
				date: '2025-02-05',
				interviews: 21,
				candidates: 17,
				feedback: 13,
				hired: 4,
			},
			{
				date: '2025-02-06',
				interviews: 19,
				candidates: 15,
				feedback: 11,
				hired: 3,
			},
			{
				date: '2025-02-07',
				interviews: 23,
				candidates: 18,
				feedback: 14,
				hired: 5,
			},
			{
				date: '2025-02-08',
				interviews: 17,
				candidates: 14,
				feedback: 10,
				hired: 3,
			},
			{
				date: '2025-02-09',
				interviews: 26,
				candidates: 21,
				feedback: 17,
				hired: 6,
			},
			{
				date: '2025-02-10',
				interviews: 15,
				candidates: 12,
				feedback: 8,
				hired: 2,
			},
		],
		'03': [
			{
				date: '2025-03-01',
				interviews: 19,
				candidates: 15,
				feedback: 11,
				hired: 3,
			},
			{
				date: '2025-03-02',
				interviews: 22,
				candidates: 18,
				feedback: 14,
				hired: 4,
			},
			{
				date: '2025-03-03',
				interviews: 17,
				candidates: 13,
				feedback: 9,
				hired: 2,
			},
			{
				date: '2025-03-04',
				interviews: 25,
				candidates: 20,
				feedback: 16,
				hired: 5,
			},
			{
				date: '2025-03-05',
				interviews: 20,
				candidates: 16,
				feedback: 12,
				hired: 3,
			},
			{
				date: '2025-03-06',
				interviews: 18,
				candidates: 14,
				feedback: 10,
				hired: 3,
			},
			{
				date: '2025-03-07',
				interviews: 24,
				candidates: 19,
				feedback: 15,
				hired: 4,
			},
			{
				date: '2025-03-08',
				interviews: 21,
				candidates: 17,
				feedback: 13,
				hired: 4,
			},
			{
				date: '2025-03-09',
				interviews: 16,
				candidates: 12,
				feedback: 8,
				hired: 2,
			},
			{
				date: '2025-03-10',
				interviews: 23,
				candidates: 18,
				feedback: 14,
				hired: 5,
			},
		],
	},
	2024: {
		12: [
			{
				date: '2024-12-01',
				interviews: 14,
				candidates: 11,
				feedback: 7,
				hired: 2,
			},
			{
				date: '2024-12-02',
				interviews: 17,
				candidates: 13,
				feedback: 9,
				hired: 3,
			},
			{
				date: '2024-12-03',
				interviews: 12,
				candidates: 9,
				feedback: 6,
				hired: 1,
			},
			{
				date: '2024-12-04',
				interviews: 20,
				candidates: 16,
				feedback: 12,
				hired: 4,
			},
			{
				date: '2024-12-05',
				interviews: 18,
				candidates: 14,
				feedback: 10,
				hired: 3,
			},
			{
				date: '2024-12-06',
				interviews: 15,
				candidates: 12,
				feedback: 8,
				hired: 2,
			},
			{
				date: '2024-12-07',
				interviews: 22,
				candidates: 18,
				feedback: 14,
				hired: 5,
			},
			{
				date: '2024-12-08',
				interviews: 19,
				candidates: 15,
				feedback: 11,
				hired: 3,
			},
			{
				date: '2024-12-09',
				interviews: 16,
				candidates: 13,
				feedback: 9,
				hired: 2,
			},
			{
				date: '2024-12-10',
				interviews: 21,
				candidates: 17,
				feedback: 13,
				hired: 4,
			},
		],
	},
}

const chartConfig = {
	interviews: { label: 'Interviews', color: '#8B5CF6' },
	candidates: { label: 'Candidates', color: '#06B6D4' },
	feedback: { label: 'Feedback', color: '#F59E0B' },
	hired: { label: 'Hired', color: '#10B981' },
}

export function InterviewCharts({ selectedYear, selectedMonth }) {
	const [chartYear, setChartYear] = React.useState(selectedYear)
	const [chartMonth, setChartMonth] = React.useState(selectedMonth)

	const chartData =
		allChartData[chartYear]?.[chartMonth] || allChartData['2025']['01']

	const availableYears = ['2024', '2025']
	const availableMonths = [
		{ value: '01', label: 'January' },
		{ value: '02', label: 'February' },
		{ value: '03', label: 'March' },
		{ value: '04', label: 'April' },
		{ value: '05', label: 'May' },
		{ value: '06', label: 'June' },
		{ value: '07', label: 'July' },
		{ value: '08', label: 'August' },
		{ value: '09', label: 'September' },
		{ value: '10', label: 'October' },
		{ value: '11', label: 'November' },
		{ value: '12', label: 'December' },
	]

	return (
		<Card className='border border-gray-200'>
			<CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
				<div className='grid flex-1 gap-1'>
					<CardTitle className='text-xl'>
						Interview Analytics
					</CardTitle>
					<CardDescription>
						Daily recruitment activities for{' '}
						{
							availableMonths.find(m => m.value === chartMonth)
								?.label
						}{' '}
						{chartYear}
					</CardDescription>
				</div>
				<div className='flex gap-2'>
					<Select value={chartYear} onValueChange={setChartYear}>
						<SelectTrigger className='w-[100px]'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{availableYears.map(year => (
								<SelectItem key={year} value={year}>
									{year}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select value={chartMonth} onValueChange={setChartMonth}>
						<SelectTrigger className='w-[120px]'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{availableMonths.map(month => (
								<SelectItem
									key={month.value}
									value={month.value}
								>
									{month.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
				<ChartContainer
					config={chartConfig}
					className='aspect-auto h-[350px] w-full'
				>
					<ResponsiveContainer width='100%' height='100%'>
						<AreaChart data={chartData}>
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
									return date.toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
									})
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
	)
}
