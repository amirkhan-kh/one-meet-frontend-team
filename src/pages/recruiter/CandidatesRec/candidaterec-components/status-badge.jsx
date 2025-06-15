import { Badge } from '@/components/ui/badge'
import { statusColors, statusIcons } from '../types/candidate'

export function StatusBadge({
	status,
	className = '',
	showIcon = true,
	interactive = false,
	onClick,
}) {
	return (
		<Badge
			variant='outline'
			className={`
        ${statusColors[status]} 
        font-medium 
        transition-all 
        duration-200 
        ${interactive ? 'cursor-pointer hover:scale-105' : ''} 
        ${className}
      `}
			onClick={onClick}
		>
			{showIcon && <span className='mr-1'>{statusIcons[status]}</span>}
			<span className='capitalize'>{status}</span>
		</Badge>
	)
}
