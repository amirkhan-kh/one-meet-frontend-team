// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// export const ProfileAvatar = ({ user, size = 'md' }) => {
// 	const getInitials = email => {
// 		// Extract name from email or use first two letters of email
// 		const emailParts = email.split('@')[0]
// 		if (emailParts.includes('.')) {
// 			const nameParts = emailParts.split('.')
// 			return nameParts
// 				.map(part => part[0])
// 				.join('')
// 				.toUpperCase()
// 				.slice(0, 2)
// 		}
// 		return emailParts.slice(0, 2).toUpperCase()
// 	}

// 	const sizeClasses = {
// 		sm: 'h-8 w-8',
// 		md: 'h-10 w-10',
// 		lg: 'h-12 w-12',
// 	}

// 	return (
// 		<Avatar className={sizeClasses[size]}>
// 			<AvatarImage src='/placeholder.svg' alt={user.email} />
// 			<AvatarFallback className='bg-blue-100 text-blue-600 font-medium'>
// 				{getInitials(user.email)}
// 			</AvatarFallback>
// 		</Avatar>
// 	)
// }

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProfileAvatar = ({ size = 'md' }) => {
	const [user, setUser] = useState(null)
	const [avatarSrc, setAvatarSrc] = useState('/placeholder.svg')
	const navigate = useNavigate()

	const sizeClasses = {
		sm: 'h-8 w-8',
		md: 'h-10 w-10',
		lg: 'h-12 w-12',
	}

	const getInitials = (firstName, lastName) => {
		return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
	}

	useEffect(() => {
		const token = localStorage.getItem('accessToken')
		if (!token) {
			navigate('/login')
			return
		}

		// 1. Get user info
		axios
			.get('https://api.onemeet.app/user/me', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(res => {
				const userData = res.data.data
				setUser(userData)

				// 2. Get profile picture blob
				if (userData.profilePicture) {
					axios
						.get(
							`https://api.onemeet.app/media/business/files/${userData.profilePicture}`,
							{
								headers: { Authorization: `Bearer ${token}` },
								responseType: 'blob',
							}
						)
						.then(res => {
							const imageUrl = URL.createObjectURL(res.data)
							setAvatarSrc(imageUrl)
						})
						.catch(err => {
							console.error('Rasmni olishda xatolik:', err)
						})
				}
			})
			.catch(err => {
				console.error('User ma’lumotini olishda xatolik:', err)
			})
	}, [])

	if (!user) return null

	return (
		<Avatar className={sizeClasses[size]}>
			<AvatarImage
				src={avatarSrc}
				alt={`${user.firstName} ${user.lastName}`}
			/>
			<AvatarFallback className='bg-blue-100 text-blue-600 font-medium'>
				{getInitials(user.firstName, user.lastName)}
			</AvatarFallback>
		</Avatar>
	)
}
