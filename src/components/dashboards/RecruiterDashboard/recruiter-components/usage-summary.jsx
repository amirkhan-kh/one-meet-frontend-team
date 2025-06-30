import { Card, CardContent } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Calendar, Target, TrendingUp, Users } from 'lucide-react'

const mockData = {
	2025: {
		'01': { total: 156, thisMonth: 156, hired: 28, successRate: 17.9 },
		'02': { total: 298, thisMonth: 142, hired: 31, successRate: 21.8 },
		'03': { total: 445, thisMonth: 147, hired: 29, successRate: 19.7 },
	},
	2024: {
		12: { total: 2890, thisMonth: 134, hired: 26, successRate: 19.4 },
		11: { total: 2756, thisMonth: 128, hired: 24, successRate: 18.8 },
		10: { total: 2628, thisMonth: 145, hired: 32, successRate: 22.1 },
	},
}

export function UsageSummary({
	selectedYear,
	selectedMonth,
	onYearChange,
	onMonthChange,
}) {
	const data =
		mockData[selectedYear]?.[selectedMonth] || mockData['2025']['01']

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

	const stats = [
		{
			title: 'Total interviews',
			value: data.total.toLocaleString(),
			change: '+12%',
			icon: Calendar,
			color: 'text-blue-600',
			bg: 'bg-blue-50',
		},
		{
			title: 'Interviews this month',
			value: data.thisMonth.toString(),
			change: '+8%',
			icon: Users,
			color: 'text-purple-600',
			bg: 'bg-purple-50',
		},
		{
			title: 'Successfully Hired',
			value: data.hired.toString(),
			change: '+15%',
			icon: Target,
			color: 'text-green-600',
			bg: 'bg-green-50',
		},
		{
			title: 'Success Rate',
			value: `${data.successRate}%`,
			change: '+2%',
			icon: TrendingUp,
			color: 'text-orange-600',
			bg: 'bg-orange-50',
		},
	]

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-xl font-semibold text-gray-900'>
						Usage
					</h2>
					<p className='text-sm text-gray-600 mt-1'>Summary</p>
				</div>
				<div className='flex gap-3'>
					<Select value={selectedYear} onValueChange={onYearChange}>
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
					<Select value={selectedMonth} onValueChange={onMonthChange}>
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
			</div>

			{/* Stats Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{stats.map((stat, index) => (
					<Card
						key={index}
						className='border border-gray-200 hover:shadow-md transition-shadow'
					>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm text-gray-600'>
										{stat.title}
									</p>
									<p className='text-2xl font-bold text-gray-900 mt-1'>
										{stat.value}
									</p>
									<div className='flex items-center mt-2'>
										<TrendingUp className='w-3 h-3 text-green-500 mr-1' />
										<span className='text-xs text-green-600'>
											{stat.change}
										</span>
									</div>
								</div>
								<div className={`p-2 rounded-lg ${stat.bg}`}>
									<stat.icon
										className={`w-5 h-5 ${stat.color}`}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
