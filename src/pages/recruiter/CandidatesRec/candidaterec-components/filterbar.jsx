import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Search, SlidersHorizontal, X } from 'lucide-react'

export function FilterBar({
	filters,
	onFiltersChange,
	onClearFilters,
	totalCount,
	filteredCount,
}) {
	const updateFilter = (key, value) => {
		onFiltersChange({ ...filters, [key]: value })
	}

	const activeFiltersCount = Object.values(filters).filter(
		value => value && value !== 'all' && value !== ''
	).length

	return (
		<div className='space-y-4'>
			{/* Main Search */}
			<div className='relative'>
				<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
				<Input
					value={filters.search}
					onChange={e => updateFilter('search', e.target.value)}
					placeholder='Search candidates by name, email, position...'
					className='pl-10 pr-4 h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
				/>
			</div>

			{/* Advanced Filters */}
			<div className='flex flex-wrap items-center gap-3'>
				<div className='flex items-center gap-2 text-sm text-gray-600'>
					<SlidersHorizontal className='h-4 w-4' />
					<span>Filters:</span>
				</div>

				<Select
					value={filters.status}
					onValueChange={value => updateFilter('status', value)}
				>
					<SelectTrigger className='w-32 h-9'>
						<SelectValue placeholder='Status' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Status</SelectItem>
						<SelectItem value='active'>Active</SelectItem>
						<SelectItem value='selected'>Selected</SelectItem>
						<SelectItem value='pending'>Pending</SelectItem>
						<SelectItem value='rejected'>Rejected</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={filters.position}
					onValueChange={value => updateFilter('position', value)}
				>
					<SelectTrigger className='w-40 h-9'>
						<SelectValue placeholder='Position' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Positions</SelectItem>
						<SelectItem value='developer'>Developer</SelectItem>
						<SelectItem value='designer'>Designer</SelectItem>
						<SelectItem value='manager'>Manager</SelectItem>
						<SelectItem value='analyst'>Analyst</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={filters.experience}
					onValueChange={value => updateFilter('experience', value)}
				>
					<SelectTrigger className='w-36 h-9'>
						<SelectValue placeholder='Experience' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Levels</SelectItem>
						<SelectItem value='junior'>Junior (0-2y)</SelectItem>
						<SelectItem value='mid'>Mid (2-5y)</SelectItem>
						<SelectItem value='senior'>Senior (5+y)</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={filters.score}
					onValueChange={value => updateFilter('score', value)}
				>
					<SelectTrigger className='w-32 h-9'>
						<SelectValue placeholder='Score' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Scores</SelectItem>
						<SelectItem value='high'>High (80+)</SelectItem>
						<SelectItem value='medium'>Medium (60-79)</SelectItem>
						<SelectItem value='low'>Low (&lt;60)</SelectItem>
					</SelectContent>
				</Select>

				{activeFiltersCount > 0 && (
					<Button
						variant='outline'
						size='sm'
						onClick={onClearFilters}
						className='h-9 gap-1 text-gray-600 hover:text-gray-900'
					>
						<X className='h-3 w-3' />
						Clear ({activeFiltersCount})
					</Button>
				)}
			</div>

			{/* Results Summary */}
			<div className='flex items-center justify-between text-sm text-gray-600'>
				<div className='flex items-center gap-2'>
					<span>
						Showing <strong>{filteredCount}</strong> of{' '}
						<strong>{totalCount}</strong> candidates
					</span>
					{activeFiltersCount > 0 && (
						<Badge variant='secondary' className='text-xs'>
							{activeFiltersCount} filter
							{activeFiltersCount > 1 ? 's' : ''} active
						</Badge>
					)}
				</div>
			</div>
		</div>
	)
}
