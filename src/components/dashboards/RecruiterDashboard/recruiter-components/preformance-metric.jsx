import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'

const performanceData = [
	{ month: 'Sep', hireRate: 18.5, interviewRate: 72, responseRate: 89 },
	{ month: 'Oct', hireRate: 19.2, interviewRate: 75, responseRate: 91 },
	{ month: 'Nov', hireRate: 20.1, interviewRate: 78, responseRate: 93 },
	{ month: 'Dec', hireRate: 19.8, interviewRate: 76, responseRate: 92 },
	{ month: 'Jan', hireRate: 21.3, interviewRate: 80, responseRate: 95 },
]

const chartConfig = {
	hireRate: { label: 'Hire Rate %', color: '#10B981' },
	interviewRate: { label: 'Interview Rate %', color: '#3B82F6' },
	responseRate: { label: 'Response Rate %', color: '#F59E0B' },
}

export function PerformanceMetrics() {
	return (
		<Card className='border border-gray-200'>
			<CardHeader>
				<CardTitle className='text-xl'>Performance Trends</CardTitle>
				<CardDescription>5-month performance analysis</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className='h-[300px] w-full'
				>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart
							data={performanceData}
							margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
						>
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
						</LineChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
