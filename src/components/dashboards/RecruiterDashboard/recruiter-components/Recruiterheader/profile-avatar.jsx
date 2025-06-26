import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const ProfileAvatar = ({ user, size = 'md' }) => {
	const getInitials = name => {
		return name
			.split(' ')
			.map(n => n[0])
			.join('')
			.toUpperCase()
	}

	const sizeClasses = {
		sm: 'h-8 w-8',
		md: 'h-10 w-10',
		lg: 'h-12 w-12',
	}

	return (
		<Avatar className={sizeClasses[size]}>
			<AvatarImage
				src={user.avatar || '/placeholder.svg'}
				alt={user.name}
			/>
			<AvatarFallback className='bg-blue-100 text-blue-600 font-medium'>
				{getInitials(user.name)}
			</AvatarFallback>
		</Avatar>
	)
}
