'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Archive,
	CheckCircle,
	ChevronDown,
	Clock,
	Mail,
	Star,
	Trash2,
	Users,
	XCircle,
} from 'lucide-react'

export function BulkActions({
	selectedCount,
	totalCount,
	onSelectAll,
	onClearSelection,
	onBulkStatusUpdate,
	onBulkDelete,
	onBulkEmail,
	onBulkArchive,
}) {
	const isAllSelected = selectedCount === totalCount && totalCount > 0
	const isIndeterminate = selectedCount > 0 && selectedCount < totalCount

	if (selectedCount === 0) {
		return (
			<div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200'>
				<Checkbox
					checked={isAllSelected}
					ref={el => {
						if (el) el.indeterminate = isIndeterminate
					}}
					onCheckedChange={onSelectAll}
					className='data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600'
				/>
				<span className='text-sm text-gray-600'>
					Select candidates to perform bulk actions
				</span>
			</div>
		)
	}

	return (
		<div className='flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200'>
			<div className='flex items-center gap-3'>
				<Checkbox
					checked={isAllSelected}
					ref={el => {
						if (el) el.indeterminate = isIndeterminate
					}}
					onCheckedChange={onSelectAll}
					className='data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600'
				/>
				<Badge
					variant='secondary'
					className='bg-blue-100 text-blue-800'
				>
					{selectedCount} selected
				</Badge>
				<Button
					variant='ghost'
					size='sm'
					onClick={onClearSelection}
					className='text-blue-700 hover:text-blue-900 hover:bg-blue-100'
				>
					Clear selection
				</Button>
			</div>

			<div className='flex items-center gap-2'>
				{/* Status Update Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							size='sm'
							className='gap-2 bg-white'
						>
							<Users className='h-4 w-4' />
							Update Status
							<ChevronDown className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() => onBulkStatusUpdate('active')}
						>
							<CheckCircle className='mr-2 h-4 w-4 text-emerald-600' />
							Mark as Active
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => onBulkStatusUpdate('selected')}
						>
							<Star className='mr-2 h-4 w-4 text-blue-600' />
							Mark as Selected
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => onBulkStatusUpdate('pending')}
						>
							<Clock className='mr-2 h-4 w-4 text-amber-600' />
							Mark as Pending
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => onBulkStatusUpdate('rejected')}
						>
							<XCircle className='mr-2 h-4 w-4 text-red-600' />
							Mark as Rejected
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Other Actions */}
				<Button
					variant='outline'
					size='sm'
					onClick={onBulkEmail}
					className='gap-2 bg-white'
				>
					<Mail className='h-4 w-4' />
					Send Email
				</Button>

				<Button
					variant='outline'
					size='sm'
					onClick={onBulkArchive}
					className='gap-2 bg-white'
				>
					<Archive className='h-4 w-4' />
					Archive
				</Button>

				<Button
					variant='outline'
					size='sm'
					onClick={onBulkDelete}
					className='gap-2 bg-white text-red-600 hover:text-red-700 hover:bg-red-50'
				>
					<Trash2 className='h-4 w-4' />
					Delete
				</Button>
			</div>
		</div>
	)
}
