'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function EditCandidateModal({
	candidate,
	isOpen,
	onClose,
	onSubmit,
	isLoading,
}) {
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		position: '',
		user_profileId: '',
		resume_url: '',
		career_goals: '',
		location: '',
		experience: '',
		skills: '',
		score: 0,
	})

	useEffect(() => {
		if (candidate) {
			setForm({
				name: candidate.name || '',
				email: candidate.email || '',
				phone: candidate.phone || '',
				position: candidate.position || '',
				user_profileId: candidate.user_profileId || '',
				resume_url: candidate.resume_url || '',
				career_goals: candidate.career_goals || '',
				location: candidate.location || '',
				experience: candidate.experience || '',
				skills: candidate.skills?.join(', ') || '',
				score: candidate.score || 0,
			})
		}
	}, [candidate])

	const handleSubmit = async e => {
		e.preventDefault()
		if (!candidate) return

		await onSubmit(candidate.id, form)
	}

	const updateForm = (field, value) => {
		setForm(prev => ({ ...prev, [field]: value }))
	}

	if (!candidate) return null

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='flex items-center justify-between'>
						<span>Edit Candidate</span>
						<Button
							variant='ghost'
							size='sm'
							onClick={onClose}
							className='h-6 w-6 p-0'
						>
							<X className='h-4 w-4' />
						</Button>
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Basic Information */}
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold text-gray-900'>
							Basic Information
						</h3>

						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='name'>Full Name</Label>
								<Input
									id='name'
									value={form.name}
									onChange={e =>
										updateForm('name', e.target.value)
									}
									placeholder='Full name'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									value={form.email}
									onChange={e =>
										updateForm('email', e.target.value)
									}
									placeholder='email@example.com'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='phone'>Phone</Label>
								<Input
									id='phone'
									value={form.phone}
									onChange={e =>
										updateForm('phone', e.target.value)
									}
									placeholder='+1 (555) 123-4567'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='position'>Position</Label>
								<Input
									id='position'
									value={form.position}
									onChange={e =>
										updateForm('position', e.target.value)
									}
									placeholder='Job title'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='location'>Location</Label>
								<Input
									id='location'
									value={form.location || ''}
									onChange={e =>
										updateForm('location', e.target.value)
									}
									placeholder='City, Country'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='experience'>Experience</Label>
								<Select
									value={form.experience || ''}
									onValueChange={value =>
										updateForm('experience', value)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select experience level' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='0-1 years'>
											0-1 years
										</SelectItem>
										<SelectItem value='1-3 years'>
											1-3 years
										</SelectItem>
										<SelectItem value='3-5 years'>
											3-5 years
										</SelectItem>
										<SelectItem value='5+ years'>
											5+ years
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='score'>Score (0-100)</Label>
								<Input
									id='score'
									type='number'
									min='0'
									max='100'
									value={form.score || ''}
									onChange={e =>
										updateForm(
											'score',
											Number.parseInt(e.target.value) || 0
										)
									}
									placeholder='85'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='skills'>
								Skills (comma-separated)
							</Label>
							<Input
								id='skills'
								value={form.skills || ''}
								onChange={e =>
									updateForm('skills', e.target.value)
								}
								placeholder='JavaScript, React, Node.js, Python'
							/>
						</div>
					</div>

					{/* API Required Fields */}
					<div className='space-y-4 p-4 bg-blue-50 rounded-lg'>
						<h3 className='font-semibold text-blue-900'>
							API Required Fields
						</h3>

						<div className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='user_profileId'>
									User Profile ID *
								</Label>
								<Input
									id='user_profileId'
									value={form.user_profileId}
									onChange={e =>
										updateForm(
											'user_profileId',
											e.target.value
										)
									}
									placeholder='3fa85f64-5717-4562-b3fc-2c963f66afa6'
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='resume_url'>Resume URL *</Label>
								<Input
									id='resume_url'
									type='url'
									value={form.resume_url}
									onChange={e =>
										updateForm('resume_url', e.target.value)
									}
									placeholder='https://example.com/resume.pdf'
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='career_goals'>
									Career Goals *
								</Label>
								<Textarea
									id='career_goals'
									value={form.career_goals}
									onChange={e =>
										updateForm(
											'career_goals',
											e.target.value
										)
									}
									placeholder='Describe career goals...'
									rows={4}
									required
								/>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex gap-3 pt-4 border-t'>
						<Button
							type='submit'
							disabled={
								isLoading ||
								!form.user_profileId ||
								!form.resume_url ||
								!form.career_goals
							}
							className='flex-1 bg-blue-600 hover:bg-blue-700 gap-2'
						>
							{isLoading ? (
								<>
									<Loader2 className='h-4 w-4 animate-spin' />
									Updating...
								</>
							) : (
								<>
									<Save className='h-4 w-4' />
									Update Candidate
								</>
							)}
						</Button>
						<Button
							type='button'
							variant='outline'
							onClick={onClose}
							className='flex-1'
							disabled={isLoading}
						>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
