import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { FilterIcon, Search, SortAsc, SortDesc } from 'lucide-react'

export function CandidateFilters({
	searchTerm,
	setSearchTerm,
	statusFilter,
	setStatusFilter,
	typeFilter,
	setTypeFilter,
	scoreFilter,
	setScoreFilter,
	sortBy,
	setSortBy,
	sortOrder,
	setSortOrder,
	clearFilters,
}) {
	return (
		<Card className='shadow-sm border-gray-200'>
			<CardContent className='p-4 sm:p-6'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4'>
					<div className='space-y-2'>
						<label className='text-sm font-medium text-gray-700'>
							Search
						</label>
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
							<Input
								placeholder='Search candidates...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
							/>
						</div>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-gray-700'>
							Status
						</label>
						<Select
							value={statusFilter}
							onValueChange={setStatusFilter}
						>
							<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500 cursor-pointer'>
								<SelectValue placeholder='All statuses' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem
									value='all'
									className='cursor-pointer'
								>
									All statuses
								</SelectItem>
								<SelectItem
									value='active'
									className='cursor-pointer'
								>
									Active
								</SelectItem>
								<SelectItem
									value='selected'
									className='cursor-pointer'
								>
									Selected
								</SelectItem>
								<SelectItem
									value='pending'
									className='cursor-pointer'
								>
									Pending
								</SelectItem>
								<SelectItem
									value='rejected'
									className='cursor-pointer'
								>
									Rejected
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-gray-700'>
							Position Type
						</label>
						<Select
							value={typeFilter}
							onValueChange={setTypeFilter}
						>
							<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500 cursor-pointer'>
								<SelectValue placeholder='All types' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem
									value='all'
									className='cursor-pointer'
								>
									All types
								</SelectItem>
								<SelectItem
									value='developer'
									className='cursor-pointer'
								>
									Developer
								</SelectItem>
								<SelectItem
									value='designer'
									className='cursor-pointer'
								>
									Designer
								</SelectItem>
								<SelectItem
									value='manager'
									className='cursor-pointer'
								>
									Manager
								</SelectItem>
								<SelectItem
									value='analyst'
									className='cursor-pointer'
								>
									Analyst
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-gray-700'>
							Score Range
						</label>
						<Select
							value={scoreFilter}
							onValueChange={setScoreFilter}
						>
							<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500 cursor-pointer'>
								<SelectValue placeholder='All scores' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem
									value='all'
									className='cursor-pointer'
								>
									All scores
								</SelectItem>
								<SelectItem
									value='high'
									className='cursor-pointer'
								>
									High (80+)
								</SelectItem>
								<SelectItem
									value='medium'
									className='cursor-pointer'
								>
									Medium (60-79)
								</SelectItem>
								<SelectItem
									value='low'
									className='cursor-pointer'
								>
									Low (&lt;60)
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-gray-700'>
							Sort By
						</label>
						<Select value={sortBy} onValueChange={setSortBy}>
							<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500 cursor-pointer'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem
									value='name'
									className='cursor-pointer'
								>
									Name
								</SelectItem>
								<SelectItem
									value='score'
									className='cursor-pointer'
								>
									Score
								</SelectItem>
								<SelectItem
									value='rating'
									className='cursor-pointer'
								>
									Rating
								</SelectItem>
								<SelectItem
									value='createdAt'
									className='cursor-pointer'
								>
									Date Added
								</SelectItem>
								<SelectItem
									value='lastContact'
									className='cursor-pointer'
								>
									Last Contact
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-gray-700'>
							Actions
						</label>
						<div className='flex gap-2'>
							<Button
								onClick={clearFilters}
								variant='outline'
								className='flex-1 border-gray-300 hover:bg-gray-50 cursor-pointer'
							>
								<FilterIcon className='w-4 h-4 mr-2' />
								Clear
							</Button>
							<Button
								onClick={() =>
									setSortOrder(
										sortOrder === 'asc' ? 'desc' : 'asc'
									)
								}
								variant='outline'
								className='px-3 cursor-pointer hover:bg-gray-50'
							>
								{sortOrder === 'asc' ? (
									<SortAsc className='w-4 h-4' />
								) : (
									<SortDesc className='w-4 h-4' />
								)}
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
