// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { Loader2 } from 'lucide-react'
// import { useState } from 'react'
// import { toast } from 'sonner'

// export const PersonalInformation = ({ user, setUser }) => {
// 	const [formData, setFormData] = useState({
// 		fullName: user.fullName,
// 		email: user.email,
// 		bio: user.bio,
// 	})
// 	const [isSaving, setIsSaving] = useState(false)

// 	const handleSave = async () => {
// 		try {
// 			setIsSaving(true)
// 			await new Promise(resolve => setTimeout(resolve, 1000))

// 			setUser({ ...user, ...formData })
// 			toast.success('Personal information updated successfully')
// 		} catch {
// 			toast.error('Failed to update personal information')
// 		} finally {
// 			setIsSaving(false)
// 		}
// 	}

// 	const handleCancel = () => {
// 		setFormData({
// 			fullName: user.fullName,
// 			email: user.email,
// 			bio: user.bio,
// 		})
// 	}

// 	return (
// 		<Card className='bg-white border border-gray-200'>
// 			<CardHeader className='border-b border-gray-100'>
// 				<CardTitle className='text-xl font-semibold text-gray-900'>
// 					Personal Information
// 				</CardTitle>
// 			</CardHeader>
// 			<CardContent className='p-6'>
// 				<div className='space-y-6'>
// 					<div>
// 						<Label
// 							htmlFor='fullName'
// 							className='text-sm font-medium text-gray-700'
// 						>
// 							Full Name
// 						</Label>
// 						<Input
// 							id='fullName'
// 							value={formData.fullName}
// 							onChange={e =>
// 								setFormData(prev => ({
// 									...prev,
// 									fullName: e.target.value,
// 								}))
// 							}
// 							placeholder='Enter your full name'
// 							className='mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
// 						/>
// 					</div>

// 					<div>
// 						<Label
// 							htmlFor='email'
// 							className='text-sm font-medium text-gray-700'
// 						>
// 							Email Address
// 						</Label>
// 						<Input
// 							id='email'
// 							type='email'
// 							value={formData.email}
// 							onChange={e =>
// 								setFormData(prev => ({
// 									...prev,
// 									email: e.target.value,
// 								}))
// 							}
// 							placeholder='Enter your email'
// 							className='mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
// 						/>
// 					</div>

// 					<div>
// 						<Label
// 							htmlFor='bio'
// 							className='text-sm font-medium text-gray-700'
// 						>
// 							Bio
// 						</Label>
// 						<Textarea
// 							id='bio'
// 							value={formData.bio}
// 							onChange={e =>
// 								setFormData(prev => ({
// 									...prev,
// 									bio: e.target.value,
// 								}))
// 							}
// 							placeholder='Enter your bio'
// 							rows={4}
// 							className='mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
// 						/>
// 					</div>

// 					<div className='flex gap-3 pt-4'>
// 						<Button
// 							onClick={handleSave}
// 							disabled={isSaving}
// 							className='bg-blue-600 hover:bg-blue-700 text-white px-6'
// 						>
// 							{isSaving && (
// 								<Loader2 className='w-4 h-4 mr-2 animate-spin' />
// 							)}
// 							Save Changes
// 						</Button>
// 						<Button
// 							onClick={handleCancel}
// 							variant='outline'
// 							className='bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
// 						>
// 							Cancel
// 						</Button>
// 					</div>
// 				</div>
// 			</CardContent>
// 		</Card>
// 	)
// }

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

// localStorage'dan user ma'lumotlarini olish
const getUserFromLocalStorage = () => {
	try {
		const userData = JSON.parse(localStorage.getItem('userData'))
		const userProfile = JSON.parse(localStorage.getItem('userProfile'))
		const savedBio = localStorage.getItem('userBio')

		if (userData && userProfile) {
			return {
				fullName: `${userProfile.firstName} ${userProfile.lastName}`,
				email: userData.email,
				bio: savedBio || '', // agar bio saqlangan bo'lsa, o‘shani oladi
			}
		}
	} catch (e) {
		console.error('Error parsing localStorage user data', e)
	}
	return {
		fullName: '',
		email: '',
		bio: '',
	}
}

export const PersonalInformation = () => {
	const [user, setUser] = useState({
		fullName: '',
		email: '',
		bio: '',
	})
	const [formData, setFormData] = useState(user)
	const [isSaving, setIsSaving] = useState(false)

	// Komponent yuklanganda localStorage'dan userni o'qish
	useEffect(() => {
		const localUser = getUserFromLocalStorage()
		setUser(localUser)
		setFormData(localUser)
	}, [])

	const handleSave = async () => {
		try {
			setIsSaving(true)
			await new Promise(resolve => setTimeout(resolve, 1000))

			// Ma’lumotni yangilab statega va localStorage'ga yozamiz
			const updatedUser = { ...user, ...formData }
			setUser(updatedUser)
			localStorage.setItem('userBio', updatedUser.bio) // faqat bio'ni saqlaymiz
			toast.success('Personal information updated successfully')
		} catch {
			toast.error('Failed to update personal information')
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<Card className='bg-white border border-gray-200'>
			<CardHeader className='border-b border-gray-100'>
				<CardTitle className='text-xl font-semibold text-gray-900'>
					Personal Information
				</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='space-y-6'>
					<div>
						<Label
							htmlFor='fullName'
							className='text-sm font-medium text-gray-700'
						>
							Full Name
						</Label>
						<Input
							id='fullName'
							value={formData.fullName}
							disabled
							className='mt-1 border-gray-300 bg-gray-100 cursor-not-allowed'
						/>
					</div>

					<div>
						<Label
							htmlFor='email'
							className='text-sm font-medium text-gray-700'
						>
							Email Address
						</Label>
						<Input
							id='email'
							type='email'
							value={formData.email}
							disabled
							className='mt-1 border-gray-300 bg-gray-100 cursor-not-allowed'
						/>
					</div>

					<div>
						<Label
							htmlFor='bio'
							className='text-sm font-medium text-gray-700'
						>
							Bio
						</Label>
						<Textarea
							id='bio'
							value={formData.bio}
							onChange={e =>
								setFormData(prev => ({
									...prev,
									bio: e.target.value,
								}))
							}
							placeholder='Enter your bio'
							rows={4}
							className='mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
						/>
					</div>

					<div className='flex gap-3 pt-4'>
						<Button
							onClick={handleSave}
							disabled={isSaving}
							className='bg-blue-600 hover:bg-blue-700 text-white px-6'
						>
							{isSaving && (
								<Loader2 className='w-4 h-4 mr-2 animate-spin' />
							)}
							Save Changes
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
