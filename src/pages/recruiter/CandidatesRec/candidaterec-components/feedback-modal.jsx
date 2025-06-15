import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { statusConfig } from '@/types/candidate'
import {
	CalendarIcon,
	Check,
	CheckCircle,
	ChevronDown,
	Clock,
	Loader2,
	MessageSquare,
	Send,
	Star,
	Users,
	X,
	XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const iconMap = {
	CheckCircle,
	Clock,
	XCircle,
	Users,
}

export function FeedbackModal({
	isOpen,
	onClose,
	candidate,
	onUpdateStatus,
	onAddNote,
	isUpdatingStatus,
}) {
	const [newNote, setNewNote] = useState('')
	const [isAddingNote, setIsAddingNote] = useState(false)

	const getRatingStars = rating => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 cursor-pointer ${
					i < Math.floor(rating)
						? 'text-yellow-400 fill-current'
						: 'text-gray-300'
				}`}
			/>
		))
	}

	const getScoreColor = score => {
		if (score >= 90) return 'text-green-600 font-bold'
		if (score >= 80) return 'text-blue-600 font-semibold'
		if (score >= 70) return 'text-yellow-600 font-medium'
		return 'text-red-600 font-medium'
	}

	const handleAddNote = async () => {
		if (!candidate || !newNote.trim()) return

		setIsAddingNote(true)
		try {
			await onAddNote(candidate.id, newNote.trim())
			setNewNote('')
			toast.success('Note added successfully')
		} catch (error) {
			toast.error('Failed to add note')
		} finally {
			setIsAddingNote(false)
		}
	}

	if (!candidate) return null

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
					<DialogTitle className='text-xl font-semibold'>
						Candidate Feedback
					</DialogTitle>
					<Button
						variant='ghost'
						size='sm'
						onClick={onClose}
						className='h-6 w-6 p-0 cursor-pointer'
					>
						<X className='h-4 w-4' />
					</Button>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Candidate Header */}
					<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b'>
						<div className='flex items-center gap-4'>
							<div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold'>
								{candidate.name
									.split(' ')
									.map(n => n[0])
									.join('')}
							</div>
							<div>
								<h3 className='text-xl font-semibold'>
									{candidate.name}
								</h3>
								<p className='text-gray-600'>
									{candidate.position}
								</p>
								<div className='flex items-center gap-2 mt-1'>
									{candidate.rating && (
										<div className='flex items-center gap-1'>
											{getRatingStars(candidate.rating)}
											<span className='text-sm text-gray-500'>
												({candidate.rating})
											</span>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className='flex items-center gap-4'>
							{candidate.score && (
								<div className='text-center'>
									<div className='text-sm text-gray-500'>
										Overall Score
									</div>
									<div
										className={`text-3xl font-bold ${getScoreColor(
											candidate.score
										)}`}
									>
										{candidate.score}/100
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Detailed Feedback */}
					{candidate.feedback && (
						<div>
							<h4 className='text-lg font-semibold mb-4'>
								Detailed Feedback
							</h4>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='space-y-2'>
									<div className='flex items-center justify-between'>
										<h5 className='font-medium text-blue-600'>
											Technical Skills
										</h5>
										<span className='font-bold text-blue-600'>
											{
												candidate.feedback
													.technicalSkills.score
											}
											/10
										</span>
									</div>
									<div className='w-full bg-gray-200 rounded-full h-2'>
										<div
											className='bg-blue-600 h-2 rounded-full transition-all duration-300'
											style={{
												width: `${
													candidate.feedback
														.technicalSkills.score *
													10
												}%`,
											}}
										></div>
									</div>
									<p className='text-sm text-gray-600'>
										{
											candidate.feedback.technicalSkills
												.description
										}
									</p>
								</div>

								<div className='space-y-2'>
									<div className='flex items-center justify-between'>
										<h5 className='font-medium text-orange-600'>
											Communication
										</h5>
										<span className='font-bold text-orange-600'>
											{
												candidate.feedback.communication
													.score
											}
											/10
										</span>
									</div>
									<div className='w-full bg-gray-200 rounded-full h-2'>
										<div
											className='bg-orange-600 h-2 rounded-full transition-all duration-300'
											style={{
												width: `${
													candidate.feedback
														.communication.score *
													10
												}%`,
											}}
										></div>
									</div>
									<p className='text-sm text-gray-600'>
										{
											candidate.feedback.communication
												.description
										}
									</p>
								</div>

								<div className='space-y-2'>
									<div className='flex items-center justify-between'>
										<h5 className='font-medium text-teal-600'>
											Cultural Fit
										</h5>
										<span className='font-bold text-teal-600'>
											{
												candidate.feedback.culturalFit
													.score
											}
											/10
										</span>
									</div>
									<div className='w-full bg-gray-200 rounded-full h-2'>
										<div
											className='bg-teal-600 h-2 rounded-full transition-all duration-300'
											style={{
												width: `${
													candidate.feedback
														.culturalFit.score * 10
												}%`,
											}}
										></div>
									</div>
									<p className='text-sm text-gray-600'>
										{
											candidate.feedback.culturalFit
												.description
										}
									</p>
								</div>

								<div className='space-y-2'>
									<div className='flex items-center justify-between'>
										<h5 className='font-medium text-purple-600'>
											Experience Relevance
										</h5>
										<span className='font-bold text-purple-600'>
											{
												candidate.feedback
													.experienceRelevance.score
											}
											/10
										</span>
									</div>
									<div className='w-full bg-gray-200 rounded-full h-2'>
										<div
											className='bg-purple-600 h-2 rounded-full transition-all duration-300'
											style={{
												width: `${
													candidate.feedback
														.experienceRelevance
														.score * 10
												}%`,
											}}
										></div>
									</div>
									<p className='text-sm text-gray-600'>
										{
											candidate.feedback
												.experienceRelevance.description
										}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Interviewer Notes */}
					{candidate.feedback?.interviewerNotes && (
						<div>
							<h4 className='text-lg font-semibold mb-3'>
								Interviewer Notes
							</h4>
							<div className='bg-gray-50 p-4 rounded-lg'>
								<p className='text-sm text-gray-700 leading-relaxed'>
									{candidate.feedback.interviewerNotes}
								</p>
							</div>
						</div>
					)}

					{/* Notes Section */}
					<Card>
						<CardHeader>
							<CardTitle className='text-lg flex items-center gap-2'>
								<MessageSquare className='w-5 h-5' />
								Notes & Comments
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							{candidate.notes && candidate.notes.length > 0 ? (
								<div className='space-y-3'>
									{candidate.notes.map(note => (
										<div
											key={note.id}
											className='bg-gray-50 p-3 rounded-lg'
										>
											<div className='flex items-center justify-between mb-2'>
												<span className='text-sm font-medium text-gray-900'>
													{note.author}
												</span>
												<span className='text-xs text-gray-500'>
													{new Date(
														note.createdAt
													).toLocaleDateString()}
												</span>
											</div>
											<p className='text-sm text-gray-700'>
												{note.content}
											</p>
										</div>
									))}
								</div>
							) : (
								<p className='text-gray-500 text-sm'>
									No notes added yet.
								</p>
							)}

							<div className='border-t pt-4'>
								<div className='flex gap-2'>
									<Textarea
										value={newNote}
										onChange={e =>
											setNewNote(e.target.value)
										}
										placeholder='Add a note about this candidate...'
										rows={2}
										className='flex-1'
									/>
									<Button
										onClick={handleAddNote}
										disabled={
											!newNote.trim() || isAddingNote
										}
										className='self-end cursor-pointer'
									>
										{isAddingNote ? (
											<Loader2 className='w-4 h-4 animate-spin' />
										) : (
											'Add Note'
										)}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Action Buttons */}
					<div className='flex flex-col sm:flex-row gap-3 pt-4 border-t'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className='bg-blue-600 hover:bg-blue-700 text-white flex-1 flex items-center justify-center gap-2 cursor-pointer'
									disabled={isUpdatingStatus}
								>
									{isUpdatingStatus ? (
										<>
											<Loader2 className='w-4 h-4 animate-spin' />
											Updating Status...
										</>
									) : (
										<>
											Update Status
											<ChevronDown className='w-4 h-4' />
										</>
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align='center'
								className='w-56'
							>
								{Object.entries(statusConfig).map(
									([status, config]) => {
										const Icon = iconMap[config.icon]
										const isCurrentStatus =
											candidate.status === status
										return (
											<DropdownMenuItem
												key={status}
												onClick={() => {
													if (!isCurrentStatus) {
														onUpdateStatus(
															candidate.id,
															status
														)
													}
												}}
												className='flex items-center gap-2 cursor-pointer'
												disabled={
													isCurrentStatus ||
													isUpdatingStatus
												}
											>
												<Icon
													className={`w-4 h-4 ${
														status === 'selected'
															? 'text-blue-600'
															: status ===
															  'pending'
															? 'text-yellow-600'
															: status ===
															  'active'
															? 'text-green-600'
															: 'text-red-600'
													}`}
												/>
												<span className='capitalize'>
													{config.label}
												</span>
												{isCurrentStatus && (
													<Check className='w-4 h-4 ml-auto' />
												)}
											</DropdownMenuItem>
										)
									}
								)}
							</DropdownMenuContent>
						</DropdownMenu>

						<Button
							variant='outline'
							className='flex-1 flex items-center gap-2 cursor-pointer hover:bg-gray-50'
						>
							<Send className='w-4 h-4' />
							Send Email
						</Button>

						<Button
							variant='outline'
							className='flex-1 flex items-center gap-2 cursor-pointer hover:bg-gray-50'
						>
							<CalendarIcon className='w-4 h-4' />
							Schedule Interview
						</Button>

						<Button
							variant='outline'
							onClick={onClose}
							className='border-gray-300 hover:bg-gray-50 flex-1 cursor-pointer'
						>
							Close
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
