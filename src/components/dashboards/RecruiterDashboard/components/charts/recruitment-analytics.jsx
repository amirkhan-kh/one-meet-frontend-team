'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

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

const chartData = [
	{ date: '2024-04-01', interviews: 12, candidates: 8, feedback: 5 },
	{ date: '2024-04-02', interviews: 15, candidates: 12, feedback: 8 },
	{ date: '2024-04-03', interviews: 8, candidates: 6, feedback: 4 },
	{ date: '2024-04-04', interviews: 18, candidates: 15, feedback: 12 },
	{ date: '2024-04-05', interviews: 22, candidates: 18, feedback: 15 },
	{ date: '2024-04-06', interviews: 16, candidates: 14, feedback: 10 },
	{ date: '2024-04-07', interviews: 10, candidates: 8, feedback: 6 },
	{ date: '2024-04-08', interviews: 25, candidates: 20, feedback: 18 },
	{ date: '2024-04-09', interviews: 5, candidates: 4, feedback: 2 },
	{ date: '2024-04-10', interviews: 14, candidates: 11, feedback: 8 },
	{ date: '2024-04-11', interviews: 19, candidates: 16, feedback: 13 },
	{ date: '2024-04-12', interviews: 13, candidates: 10, feedback: 7 },
	{ date: '2024-04-13', interviews: 21, candidates: 17, feedback: 14 },
	{ date: '2024-04-14', interviews: 9, candidates: 7, feedback: 5 },
	{ date: '2024-04-15', interviews: 11, candidates: 9, feedback: 6 },
	{ date: '2024-04-16', interviews: 17, candidates: 14, feedback: 11 },
	{ date: '2024-04-17', interviews: 24, candidates: 19, feedback: 16 },
	{ date: '2024-04-18', interviews: 20, candidates: 16, feedback: 13 },
	{ date: '2024-04-19', interviews: 12, candidates: 10, feedback: 7 },
	{ date: '2024-04-20', interviews: 7, candidates: 5, feedback: 3 },
	{ date: '2024-04-21', interviews: 16, candidates: 13, feedback: 10 },
	{ date: '2024-04-22', interviews: 14, candidates: 11, feedback: 8 },
	{ date: '2024-04-23', interviews: 18, candidates: 15, feedback: 12 },
	{ date: '2024-04-24', interviews: 23, candidates: 18, feedback: 15 },
	{ date: '2024-04-25', interviews: 15, candidates: 12, feedback: 9 },
	{ date: '2024-04-26', interviews: 8, candidates: 6, feedback: 4 },
	{ date: '2024-04-27', interviews: 26, candidates: 21, feedback: 18 },
	{ date: '2024-04-28', interviews: 11, candidates: 9, feedback: 6 },
	{ date: '2024-04-29', interviews: 19, candidates: 15, feedback: 12 },
	{ date: '2024-04-30', interviews: 27, candidates: 22, feedback: 19 },
]

const chartConfig = {
	interviews: {
		label: 'Interviews',
		color: 'hsl(var(--chart-1))',
	},
	candidates: {
		label: 'Candidates',
		color: 'hsl(var(--chart-2))',
	},
	feedback: {
		label: 'Feedback',
		color: 'hsl(var(--chart-3))',
	},
}

export function RecruitmentAnalytics() {
	const [timeRange, setTimeRange] = React.useState('30d')

	const filteredData = chartData.filter(item => {
		const date = new Date(item.date)
		const referenceDate = new Date('2024-04-30')
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

	return (
		<Card>
			<CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
				<div className='grid flex-1 gap-1'>
					<CardTitle>Recruitment Analytics</CardTitle>
					<CardDescription>
						Showing recruitment activities for the selected period
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
					className='aspect-auto h-[250px] w-full'
				>
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
						</defs>
						<CartesianGrid vertical={false} />
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
							dataKey='feedback'
							type='natural'
							fill='url(#fillFeedback)'
							stroke='var(--color-feedback)'
							stackId='a'
						/>
						<Area
							dataKey='candidates'
							type='natural'
							fill='url(#fillCandidates)'
							stroke='var(--color-candidates)'
							stackId='a'
						/>
						<Area
							dataKey='interviews'
							type='natural'
							fill='url(#fillInterviews)'
							stroke='var(--color-interviews)'
							stackId='a'
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
