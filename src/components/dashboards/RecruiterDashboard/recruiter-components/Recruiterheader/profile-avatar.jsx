import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const ProfileAvatar = ({ user, size = 'md' }) => {
	const getInitials = email => {
		// Extract name from email or use first two letters of email
		const emailParts = email.split('@')[0]
		if (emailParts.includes('.')) {
			const nameParts = emailParts.split('.')
			return nameParts
				.map(part => part[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		}
		return emailParts.slice(0, 2).toUpperCase()
	}

	const sizeClasses = {
		sm: 'h-8 w-8',
		md: 'h-10 w-10',
		lg: 'h-12 w-12',
	}

	return (
		<Avatar className={sizeClasses[size]}>
			<AvatarImage src='/placeholder.svg' alt={user.email} />
			<AvatarFallback className='bg-blue-100 text-blue-600 font-medium'>
				{getInitials(user.email)}
			</AvatarFallback>
		</Avatar>
	)
}

