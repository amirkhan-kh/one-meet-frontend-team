'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Calendar,
	CalendarIcon,
	Edit,
	FileText,
	Mail,
	MapPin,
	Phone,
	Send,
	Star,
	TrendingUp,
	User,
} from 'lucide-react'
import { StatusBadge } from './status-badge'

export function CandidateDetailModal({ candidate, isOpen, onClose }) {
	if (!candidate) return null

	const getRatingStars = rating => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`h-4 w-4 ${
					i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
				}`}
			/>
		))
	}

	const getScoreColor = score => {
		if (score >= 80) return 'text-emerald-600'
		if (score >= 60) return 'text-amber-600'
		return 'text-red-600'
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='flex items-center justify-between'>
						<span>Candidate Details</span>
					</DialogTitle>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Header */}
					<div className='flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg'>
						<div className='h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold'>
							{candidate.name
								.split(' ')
								.map(n => n[0])
								.join('')}
						</div>
						<div className='flex-1'>
							<h2 className='text-2xl font-bold text-gray-900 mb-2'>
								{candidate.name}
							</h2>
							<div className='flex items-center gap-3 mb-2'>
								<StatusBadge status={candidate.status} />
								{candidate.position && (
									<Badge
										variant='outline'
										className='bg-white'
									>
										{candidate.position}
									</Badge>
								)}
							</div>
							{candidate.rating && (
								<div className='flex items-center gap-2'>
									<div className='flex gap-0.5'>
										{getRatingStars(candidate.rating)}
									</div>
									<span className='text-sm text-gray-600'>
										({candidate.rating}/5)
									</span>
								</div>
							)}
						</div>
						{candidate.score && (
							<div className='text-center'>
								<div className='text-sm text-gray-600 mb-1'>
									Score
								</div>
								<div
									className={`text-3xl font-bold ${getScoreColor(
										candidate.score
									)}`}
								>
									{candidate.score}
								</div>
							</div>
						)}
					</div>

					{/* Contact Information */}
					<div className='grid grid-cols-2 gap-6'>
						<div className='space-y-4'>
							<h3 className='text-lg font-semibold text-gray-900'>
								Contact Information
							</h3>

							<div className='space-y-3'>
								<div className='flex items-center gap-3 text-gray-700'>
									<Mail className='h-5 w-5 text-gray-400' />
									<span>{candidate.email}</span>
								</div>

								{candidate.phone && (
									<div className='flex items-center gap-3 text-gray-700'>
										<Phone className='h-5 w-5 text-gray-400' />
										<span>{candidate.phone}</span>
									</div>
								)}

								{candidate.location && (
									<div className='flex items-center gap-3 text-gray-700'>
										<MapPin className='h-5 w-5 text-gray-400' />
										<span>{candidate.location}</span>
									</div>
								)}
							</div>
						</div>

						<div className='space-y-4'>
							<h3 className='text-lg font-semibold text-gray-900'>
								Professional Details
							</h3>

							<div className='space-y-3'>
								{candidate.experience && (
									<div className='flex items-center gap-3 text-gray-700'>
										<TrendingUp className='h-5 w-5 text-gray-400' />
										<span>
											{candidate.experience} experience
										</span>
									</div>
								)}

								{candidate.user_profileId && (
									<div className='flex items-center gap-3 text-gray-700'>
										<User className='h-5 w-5 text-gray-400' />
										<span
											className='truncate'
											title={candidate.user_profileId}
										>
											Profile:{' '}
											{candidate.user_profileId.slice(
												0,
												8
											)}
											...
										</span>
									</div>
								)}

								<div className='flex items-center gap-3 text-gray-700'>
									<Calendar className='h-5 w-5 text-gray-400' />
									<span>
										Added{' '}
										{new Date(
											candidate.createdAt
										).toLocaleDateString()}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Skills */}
					{candidate.skills && candidate.skills.length > 0 && (
						<div className='space-y-3'>
							<h3 className='text-lg font-semibold text-gray-900'>
								Skills
							</h3>
							<div className='flex flex-wrap gap-2'>
								{candidate.skills.map((skill, index) => (
									<Badge
										key={index}
										variant='secondary'
										className='bg-blue-100 text-blue-800'
									>
										{skill}
									</Badge>
								))}
							</div>
						</div>
					)}

					{/* Resume */}
					{candidate.resume_url && (
						<div className='space-y-3'>
							<h3 className='text-lg font-semibold text-gray-900'>
								Resume
							</h3>
							<div className='p-4 bg-gray-50 rounded-lg'>
								<a
									href={candidate.resume_url}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium'
								>
									<FileText className='h-5 w-5' />
									View Resume Document
								</a>
							</div>
						</div>
					)}

					{/* Career Goals */}
					{candidate.career_goals && (
						<div className='space-y-3'>
							<h3 className='text-lg font-semibold text-gray-900'>
								Career Goals
							</h3>
							<div className='p-4 bg-gray-50 rounded-lg'>
								<p className='text-gray-700 leading-relaxed'>
									{candidate.career_goals}
								</p>
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div className='flex gap-3 pt-6 border-t'>
						<Button className='flex-1 bg-blue-600 hover:bg-blue-700 gap-2'>
							<Edit className='h-4 w-4' />
							Edit Candidate
						</Button>
						<Button variant='outline' className='flex-1 gap-2'>
							<Send className='h-4 w-4' />
							Send Email
						</Button>
						<Button variant='outline' className='flex-1 gap-2'>
							<CalendarIcon className='h-4 w-4' />
							Schedule Interview
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
