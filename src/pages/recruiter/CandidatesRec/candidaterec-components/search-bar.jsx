import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'

export function SearchBar({
	value,
	onChange,
	placeholder = 'Search candidates...',
}) {
	return (
		<div className='relative'>
			<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
			<Input
				value={value}
				onChange={e => onChange(e.target.value)}
				placeholder={placeholder}
				className='pl-10 pr-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
			/>
			{value && (
				<Button
					variant='ghost'
					size='sm'
					onClick={() => onChange('')}
					className='absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100'
				>
					<X className='h-4 w-4' />
				</Button>
			)}
		</div>
	)
}
