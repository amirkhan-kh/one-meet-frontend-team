import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Edit,
	FileText,
	Mail,
	MapPin,
	MoreHorizontal,
	Phone,
	Star,
	Target,
	Trash2,
} from 'lucide-react'
import { StatusBadge } from './status-badge'

export function CandidateCard({
	candidate,
	isSelected,
	onSelect,
	onView,
	onEdit,
	onDelete,
	viewMode,
}) {
	const getScoreColor = score => {
		if (score >= 80) return 'text-emerald-600'
		if (score >= 60) return 'text-amber-600'
		return 'text-red-600'
	}

	const getRatingStars = rating => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`h-3 w-3 ${
					i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
				}`}
			/>
		))
	}

	if (viewMode === 'list') {
		return (
			<Card
				className={`p-4 hover:shadow-md transition-all duration-200 ${
					isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
				}`}
			>
				<div className='flex items-center gap-4'>
					<Checkbox
						checked={isSelected}
						onCheckedChange={() => onSelect(candidate.id)}
						className='data-[state=checked]:bg-blue-600'
					/>

					<div className='flex-1 grid grid-cols-6 gap-4 items-center'>
						<div className='col-span-2'>
							<div className='flex items-center gap-3'>
								<div className='h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold'>
									{candidate.name
										.split(' ')
										.map(n => n[0])
										.join('')}
								</div>
								<div>
									<h3 className='font-semibold text-gray-900'>
										{candidate.name}
									</h3>
									<p className='text-sm text-gray-600'>
										{candidate.email}
									</p>
								</div>
							</div>
						</div>

						<div>
							<StatusBadge status={candidate.status} />
						</div>

						<div className='text-sm text-gray-600'>
							{candidate.position || 'No position'}
						</div>

						<div className='text-center'>
							{candidate.score && (
								<div
									className={`text-lg font-bold ${getScoreColor(
										candidate.score
									)}`}
								>
									{candidate.score}
								</div>
							)}
							{candidate.rating && (
								<div className='flex justify-center gap-0.5 mt-1'>
									{getRatingStars(candidate.rating)}
								</div>
							)}
						</div>

						<div className='flex items-center gap-2 justify-end'>
							<Button
								variant='outline'
								size='sm'
								onClick={() => onView(candidate)}
								className='h-8'
							>
								View
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										size='sm'
										className='h-8 w-8 p-0'
									>
										<MoreHorizontal className='h-4 w-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuItem
										onClick={() => onEdit(candidate)}
									>
										<Edit className='mr-2 h-4 w-4' />
										Edit
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => onDelete(candidate.id)}
										className='text-red-600'
									>
										<Trash2 className='mr-2 h-4 w-4' />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</Card>
		)
	}

	return (
		<Card
			className={`p-6 hover:shadow-lg transition-all duration-200 ${
				isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
			}`}
		>
			<div className='space-y-4'>
				{/* Header */}
				<div className='flex items-start justify-between'>
					<div className='flex items-center gap-3'>
						<Checkbox
							checked={isSelected}
							onCheckedChange={() => onSelect(candidate.id)}
							className='data-[state=checked]:bg-blue-600'
						/>
						<div className='h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold'>
							{candidate.name
								.split(' ')
								.map(n => n[0])
								.join('')}
						</div>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='sm'
								className='h-8 w-8 p-0'
							>
								<MoreHorizontal className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem onClick={() => onEdit(candidate)}>
								<Edit className='mr-2 h-4 w-4' />
								Edit
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => onDelete(candidate.id)}
								className='text-red-600'
							>
								<Trash2 className='mr-2 h-4 w-4' />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Content */}
				<div className='space-y-3'>
					<div>
						<h3 className='font-semibold text-gray-900 mb-1'>
							{candidate.name}
						</h3>
						<StatusBadge status={candidate.status} />
					</div>

					<div className='space-y-2 text-sm text-gray-600'>
						<div className='flex items-center gap-2'>
							<Mail className='h-4 w-4' />
							<span className='truncate'>{candidate.email}</span>
						</div>

						{candidate.phone && (
							<div className='flex items-center gap-2'>
								<Phone className='h-4 w-4' />
								<span>{candidate.phone}</span>
							</div>
						)}

						{candidate.position && (
							<div className='flex items-center gap-2'>
								<Target className='h-4 w-4' />
								<span>{candidate.position}</span>
							</div>
						)}

						{candidate.location && (
							<div className='flex items-center gap-2'>
								<MapPin className='h-4 w-4' />
								<span>{candidate.location}</span>
							</div>
						)}
					</div>

					{/* Skills */}
					{candidate.skills && candidate.skills.length > 0 && (
						<div className='flex flex-wrap gap-1'>
							{candidate.skills
								.slice(0, 3)
								.map((skill, index) => (
									<Badge
										key={index}
										variant='secondary'
										className='text-xs'
									>
										{skill}
									</Badge>
								))}
							{candidate.skills.length > 3 && (
								<Badge variant='secondary' className='text-xs'>
									+{candidate.skills.length - 3}
								</Badge>
							)}
						</div>
					)}

					{/* Score and Rating */}
					<div className='flex items-center justify-between pt-2 border-t'>
						<div className='flex items-center gap-4'>
							{candidate.score && (
								<div className='text-center'>
									<div className='text-xs text-gray-500'>
										Score
									</div>
									<div
										className={`text-lg font-bold ${getScoreColor(
											candidate.score
										)}`}
									>
										{candidate.score}
									</div>
								</div>
							)}
							{candidate.rating && (
								<div className='flex gap-0.5'>
									{getRatingStars(candidate.rating)}
								</div>
							)}
						</div>

						<Button
							onClick={() => onView(candidate)}
							className='bg-gray-900 hover:bg-gray-800 text-white'
							size='sm'
						>
							View Details
						</Button>
					</div>
				</div>

				{/* Resume Link */}
				{candidate.resume_url && (
					<div className='pt-3 border-t'>
						<a
							href={candidate.resume_url}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm'
						>
							<FileText className='h-4 w-4' />
							View Resume
						</a>
					</div>
				)}

				{/* Career Goals Preview */}
				{candidate.career_goals && (
					<div className='p-3 bg-gray-50 rounded-lg'>
						<p className='text-sm text-gray-700 line-clamp-2'>
							{candidate.career_goals}
						</p>
					</div>
				)}
			</div>
		</Card>
	)
}
