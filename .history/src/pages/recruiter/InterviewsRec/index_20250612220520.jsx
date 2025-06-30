
import { MainLayout } from '@/components/dashboards/RecruiterDashboard/components/main-layout'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import {
	Calendar,
	Clock,
	Edit,
	Loader2,
	Phone,
	Plus,
	Users,
	Video,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const InterviewsRec = () => {
	const [interviews, setInterviews] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [typeFilter, setTypeFilter] = useState('all')
	const [languageFilter, setLanguageFilter] = useState('all')

	const [newInterview, setNewInterview] = useState({
		title: '',
		type: 'video',
		duration: 45,
		language: 'English',
		candidateName: '',
		scheduledAt: '',
		description: '',
	})

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedInterview, setSelectedInterview] = useState(null)
	const [editInterview, setEditInterview] = useState({
		title: '',
		type: 'video',
		duration: 45,
		language: 'English',
		candidateName: '',
		scheduledAt: '',
		description: '',
	})

	const mockInterviews = [
		{
			id: '1',
			title: 'Senior Developer Interview',
			type: 'video',
			duration: 45,
			language: 'English',
			candidateName: 'Luna Markov',
			scheduledAt: '2024-01-15T10:00:00Z',
			status: 'scheduled',
			description: 'Technical interview for senior developer position',
		},
		{
			id: '2',
			title: 'Product Manager Interview',
			type: 'phone',
			duration: 30,
			language: 'English',
			candidateName: 'John Smith',
			scheduledAt: '2024-01-16T14:00:00Z',
			status: 'completed',
		},
		{
			id: '3',
			title: 'Designer Interview',
			type: 'in-person',
			duration: 60,
			language: 'Spanish',
			candidateName: 'Maria Garcia',
			scheduledAt: '2024-01-17T09:00:00Z',
			status: 'scheduled',
		},
	]

	useEffect(() => {
		loadInterviews()
	}, [])

	const loadInterviews = async () => {
		try {
			setIsLoading(true)
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000))
			setInterviews(mockInterviews)
		} catch (error) {
			toast.error('Failed to load interviews')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleCreateInterview = async () => {
		try {
			setIsSaving(true)

			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1500))

			const interview = {
				id: Date.now().toString(),
				...newInterview,
				status: 'scheduled',
			}

			setInterviews(prev => [interview, ...prev])
			setIsCreateModalOpen(false)
			setNewInterview({
				title: '',
				type: 'video',
				duration: 45,
				language: 'English',
				candidateName: '',
				scheduledAt: '',
				description: '',
			})

			toast.success('Interview created successfully')
		} catch (error) {
			toast.error('Failed to create interview')
			console.error(error)
		} finally {
			setIsSaving(false)
		}
	}

	const handleEditInterview = async () => {
		if (!selectedInterview) return

		try {
			setIsSaving(true)

			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000))

			setInterviews(prev =>
				prev.map(interview =>
					interview.id === selectedInterview.id
						? { ...interview, ...editInterview }
						: interview
				)
			)

			setIsEditModalOpen(false)
			setSelectedInterview(null)
			toast.success('Interview updated successfully')
		} catch (error) {
			toast.error('Failed to update interview')
			console.error(error)
		} finally {
			setIsSaving(false)
		}
	}

	const handleDeleteInterview = async () => {
		if (!selectedInterview) return

		try {
			setIsSaving(true)

			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 500))

			setInterviews(prev =>
				prev.filter(interview => interview.id !== selectedInterview.id)
			)
			setIsDeleteDialogOpen(false)
			setSelectedInterview(null)
			toast.success('Interview deleted successfully')
		} catch (error) {
			toast.error('Failed to delete interview')
			console.error(error)
		} finally {
			setIsSaving(false)
		}
	}

	const openEditModal = interview => {
		setSelectedInterview(interview)
		setEditInterview({
			title: interview.title,
			type: interview.type,
			duration: interview.duration,
			language: interview.language,
			candidateName: interview.candidateName,
			scheduledAt: interview.scheduledAt,
			description: interview.description || '',
		})
		setIsEditModalOpen(true)
	}

	const openDetailsModal = interview => {
		setSelectedInterview(interview)
		setIsDetailsModalOpen(true)
	}

	const openDeleteDialog = interview => {
		setSelectedInterview(interview)
		setIsDeleteDialogOpen(true)
	}

	const filteredInterviews = interviews.filter(interview => {
		const matchesType =
			typeFilter === 'all' || interview.type === typeFilter
		const matchesLanguage =
			languageFilter === 'all' || interview.language === languageFilter
		return matchesType && matchesLanguage
	})

	const getTypeIcon = type => {
		switch (type) {
			case 'video':
				return Video
			case 'phone':
				return Phone
			case 'in-person':
				return Users
			default:
				return Video
		}
	}

	const getStatusColor = status => {
		switch (status) {
			case 'scheduled':
				return 'bg-blue-100 text-blue-800'
			case 'completed':
				return 'bg-green-100 text-green-800'
			case 'cancelled':
				return 'bg-red-100 text-red-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	if (isLoading) {
		return (
			<MainLayout>
				<div className='space-y-6'>
					<div className='flex justify-between items-center'>
						<div>
							<Skeleton className='h-8 w-64 mb-2' />
							<Skeleton className='h-4 w-96' />
						</div>
						<Skeleton className='h-10 w-48' />
					</div>

					<div className='flex space-x-4'>
						<Skeleton className='h-10 w-32' />
						<Skeleton className='h-10 w-32' />
						<Skeleton className='h-10 w-32' />
					</div>

					<div className='space-y-4'>
						{Array.from({ length: 3 }).map((_, i) => (
							<Card key={i}>
								<CardContent className='p-6'>
									<Skeleton className='h-6 w-48 mb-4' />
									<div className='flex items-center space-x-4'>
										<Skeleton className='h-4 w-24' />
										<Skeleton className='h-4 w-32' />
										<Skeleton className='h-8 w-20' />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</MainLayout>
		)
	}

	return (
		<MainLayout>
			<div className='space-y-6'>
				{/* Header */}
				<div className='flex justify-between items-center'>
					<div>
						<h1 className='text-2xl font-bold text-gray-900'>
							Interview Management
						</h1>
						<p className='text-gray-600'>
							Create and manage interview schedules for your
							candidates
						</p>
					</div>
					<Button
						onClick={() => setIsCreateModalOpen(true)}
						className='bg-blue-600 hover:bg-blue-700'
					>
						<Plus className='mr-2 h-4 w-4' />
						Create New Interview
					</Button>
				</div>

				{/* Filters */}
				<div className='flex space-x-4'>
					<div className='flex items-center space-x-2'>
						<span className='text-sm font-medium'>
							Interview Type
						</span>
						<Select
							value={typeFilter}
							onValueChange={setTypeFilter}
						>
							<SelectTrigger className='w-40'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Types</SelectItem>
								<SelectItem value='video'>
									Video Interview
								</SelectItem>
								<SelectItem value='phone'>
									Phone Interview
								</SelectItem>
								<SelectItem value='in-person'>
									In-Person
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='flex items-center space-x-2'>
						<span className='text-sm font-medium'>Language</span>
						<Select
							value={languageFilter}
							onValueChange={setLanguageFilter}
						>
							<SelectTrigger className='w-32'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All</SelectItem>
								<SelectItem value='English'>English</SelectItem>
								<SelectItem value='Spanish'>Spanish</SelectItem>
								<SelectItem value='French'>French</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Button variant='outline'>Apply Filters</Button>
				</div>

				{/* Interviews List */}
				<div className='space-y-4'>
					<h2 className='text-lg font-semibold'>Your Interviews</h2>

					{filteredInterviews.length === 0 ? (
						<Card>
							<CardContent className='p-8 text-center'>
								<Calendar className='h-12 w-12 text-gray-400 mx-auto mb-4' />
								<h3 className='text-lg font-medium text-gray-900 mb-2'>
									No interviews found
								</h3>
								<p className='text-gray-600'>
									Create your first interview to get started.
								</p>
							</CardContent>
						</Card>
					) : (
						filteredInterviews.map(interview => {
							const TypeIcon = getTypeIcon(interview.type)
							return (
								<Card
									key={interview.id}
									className='hover:shadow-md transition-shadow'
								>
									<CardContent className='p-6'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center space-x-4'>
												<div className='flex items-center space-x-2'>
													<Badge
														variant='outline'
														className='bg-purple-50 text-purple-700'
													>
														<TypeIcon className='mr-1 h-3 w-3' />
														{interview.type ===
														'in-person'
															? 'In-Person'
															: interview.type ===
															  'video'
															? 'Video Interview'
															: 'Phone Interview'}
													</Badge>
												</div>

												<div>
													<h3 className='font-semibold text-gray-900'>
														{interview.title}
													</h3>
													<div className='flex items-center space-x-4 text-sm text-gray-600 mt-1'>
														<span className='flex items-center'>
															<Clock className='mr-1 h-4 w-4' />
															{interview.duration}{' '}
															minutes
														</span>
														<span>
															•{' '}
															{interview.language}
														</span>
														<Badge
															className={getStatusColor(
																interview.status
															)}
														>
															{interview.status}
														</Badge>
													</div>
												</div>
											</div>

											<div className='flex items-center space-x-2'>
												<div className='flex items-center space-x-2'>
													<div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
														<span className='text-xs font-medium'>
															{interview.candidateName
																.split(' ')
																.map(n => n[0])
																.join('')}
														</span>
													</div>
													<span className='text-sm font-medium'>
														{
															interview.candidateName
														}
													</span>
												</div>

												<div className='flex items-center space-x-2'>
													<Button
														variant='outline'
														size='sm'
														onClick={() =>
															openDetailsModal(
																interview
															)
														}
													>
														View Details
													</Button>
													<Button
														variant='outline'
														size='sm'
														onClick={() =>
															openEditModal(
																interview
															)
														}
													>
														Edit
													</Button>
													<Button
														variant='outline'
														size='sm'
														onClick={() =>
															openDeleteDialog(
																interview
															)
														}
														className='text-red-600 hover:text-red-700 hover:bg-red-50'
													>
														Delete
													</Button>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							)
						})
					)}
				</div>

				{/* Create Interview Modal */}
				<Dialog
					open={isCreateModalOpen}
					onOpenChange={setIsCreateModalOpen}
				>
					<DialogContent className='max-w-2xl'>
						<DialogHeader>
							<DialogTitle>Create New Interview</DialogTitle>
						</DialogHeader>

						<div className='space-y-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<Label htmlFor='title'>
										Interview Title
									</Label>
									<Input
										id='title'
										value={newInterview.title}
										onChange={e =>
											setNewInterview(prev => ({
												...prev,
												title: e.target.value,
											}))
										}
										placeholder='e.g., Senior Developer Interview'
									/>
								</div>

								<div>
									<Label htmlFor='candidateName'>
										Candidate Name
									</Label>
									<Input
										id='candidateName'
										value={newInterview.candidateName}
										onChange={e =>
											setNewInterview(prev => ({
												...prev,
												candidateName: e.target.value,
											}))
										}
										placeholder='e.g., John Smith'
									/>
								</div>

								<div>
									<Label htmlFor='type'>Interview Type</Label>
									<Select
										value={newInterview.type}
										onValueChange={value =>
											setNewInterview(prev => ({
												...prev,
												type: value,
											}))
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='video'>
												Video Interview
											</SelectItem>
											<SelectItem value='phone'>
												Phone Interview
											</SelectItem>
											<SelectItem value='in-person'>
												In-Person
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label htmlFor='duration'>
										Duration (minutes)
									</Label>
									<Input
										id='duration'
										type='number'
										value={newInterview.duration}
										onChange={e =>
											setNewInterview(prev => ({
												...prev,
												duration:
													Number.parseInt(
														e.target.value
													) || 45,
											}))
										}
									/>
								</div>

								<div>
									<Label htmlFor='language'>Language</Label>
									<Select
										value={newInterview.language}
										onValueChange={value =>
											setNewInterview(prev => ({
												...prev,
												language: value,
											}))
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='English'>
												English
											</SelectItem>
											<SelectItem value='Spanish'>
												Spanish
											</SelectItem>
											<SelectItem value='French'>
												French
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label htmlFor='scheduledAt'>
										Scheduled Date & Time
									</Label>
									<Input
										id='scheduledAt'
										type='datetime-local'
										value={newInterview.scheduledAt}
										onChange={e =>
											setNewInterview(prev => ({
												...prev,
												scheduledAt: e.target.value,
											}))
										}
									/>
								</div>
							</div>

							<div>
								<Label htmlFor='description'>
									Description (Optional)
								</Label>
								<Textarea
									id='description'
									value={newInterview.description}
									onChange={e =>
										setNewInterview(prev => ({
											...prev,
											description: e.target.value,
										}))
									}
									placeholder='Additional notes about the interview...'
									rows={3}
								/>
							</div>

							<div className='flex justify-end space-x-4 pt-4'>
								<Button
									variant='outline'
									onClick={() => setIsCreateModalOpen(false)}
									disabled={isSaving}
								>
									Cancel
								</Button>
								<Button
									onClick={handleCreateInterview}
									disabled={
										isSaving ||
										!newInterview.title ||
										!newInterview.candidateName
									}
								>
									{isSaving && (
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									)}
									Create Interview
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>

				{/* View Details Modal */}
				<Dialog
					open={isDetailsModalOpen}
					onOpenChange={setIsDetailsModalOpen}
				>
					<DialogContent className='max-w-2xl'>
						<DialogHeader>
							<DialogTitle>Interview Details</DialogTitle>
						</DialogHeader>

						{selectedInterview && (
							<div className='space-y-4'>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Title
										</Label>
										<p className='text-sm font-medium'>
											{selectedInterview.title}
										</p>
									</div>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Candidate
										</Label>
										<p className='text-sm font-medium'>
											{selectedInterview.candidateName}
										</p>
									</div>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Type
										</Label>
										<div className='flex items-center space-x-2'>
											{(() => {
												const TypeIcon = getTypeIcon(
													selectedInterview.type
												)
												return (
													<TypeIcon className='h-4 w-4' />
												)
											})()}
											<span className='text-sm capitalize'>
												{selectedInterview.type.replace(
													'-',
													' '
												)}
											</span>
										</div>
									</div>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Duration
										</Label>
										<p className='text-sm'>
											{selectedInterview.duration} minutes
										</p>
									</div>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Language
										</Label>
										<p className='text-sm'>
											{selectedInterview.language}
										</p>
									</div>
									<div>
										<Label className='text-sm font-medium text-gray-500'>
											Status
										</Label>
										<Badge
											className={getStatusColor(
												selectedInterview.status
											)}
										>
											{selectedInterview.status}
										</Badge>
									</div>
									<div className='col-span-2'>
										<Label className='text-sm font-medium text-gray-500'>
											Scheduled Date & Time
										</Label>
										<p className='text-sm'>
											{new Date(
												selectedInterview.scheduledAt
											).toLocaleString()}
										</p>
									</div>
									{selectedInterview.description && (
										<div className='col-span-2'>
											<Label className='text-sm font-medium text-gray-500'>
												Description
											</Label>
											<p className='text-sm text-gray-700'>
												{selectedInterview.description}
											</p>
										</div>
									)}
								</div>

								<div className='flex justify-end space-x-2 pt-4'>
									<Button
										variant='outline'
										onClick={() =>
											setIsDetailsModalOpen(false)
										}
									>
										Close
									</Button>
									<Button
										onClick={() => {
											setIsDetailsModalOpen(false)
											openEditModal(selectedInterview)
										}}
									>
										<Edit className='mr-2 h-4 w-4' />
										Edit Interview
									</Button>
								</div>
							</div>
						)}
					</DialogContent>
				</Dialog>

				{/* Edit Interview Modal */}
				<Dialog
					open={isEditModalOpen}
					onOpenChange={setIsEditModalOpen}
				>
					<DialogContent className='max-w-2xl'>
						<DialogHeader>
							<DialogTitle>Edit Interview</DialogTitle>
						</DialogHeader>

						<div className='space-y-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<Label htmlFor='edit-title'>
										Interview Title
									</Label>
									<Input
										id='edit-title'
										value={editInterview.title}
										onChange={e =>
											setEditInterview(prev => ({
												...prev,
												title: e.target.value,
											}))
										}
										placeholder='e.g., Senior Developer Interview'
									/>
								</div>

								<div>
									<Label htmlFor='edit-candidateName'>
										Candidate Name
									</Label>
									<Input
										id='edit-candidateName'
										value={editInterview.candidateName}
										onChange={e =>
											setEditInterview(prev => ({
												...prev,
												candidateName: e.target.value,
											}))
										}
										placeholder='e.g., John Smith'
									/>
								</div>

								<div>
									<Label htmlFor='edit-type'>
										Interview Type
									</Label>
									<Select
										value={editInterview.type}
										onValueChange={value =>
											setEditInterview(prev => ({
												...prev,
												type: value,
											}))
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='video'>
												Video Interview
											</SelectItem>
											<SelectItem value='phone'>
												Phone Interview
											</SelectItem>
											<SelectItem value='in-person'>
												In-Person
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label htmlFor='edit-duration'>
										Duration (minutes)
									</Label>
									<Input
										id='edit-duration'
										type='number'
										value={editInterview.duration}
										onChange={e =>
											setEditInterview(prev => ({
												...prev,
												duration:
													Number.parseInt(
														e.target.value
													) || 45,
											}))
										}
									/>
								</div>

								<div>
									<Label htmlFor='edit-language'>
										Language
									</Label>
									<Select
										value={editInterview.language}
										onValueChange={value =>
											setEditInterview(prev => ({
												...prev,
												language: value,
											}))
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='English'>
												English
											</SelectItem>
											<SelectItem value='Spanish'>
												Spanish
											</SelectItem>
											<SelectItem value='French'>
												French
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label htmlFor='edit-scheduledAt'>
										Scheduled Date & Time
									</Label>
									<Input
										id='edit-scheduledAt'
										type='datetime-local'
										value={editInterview.scheduledAt}
										onChange={e =>
											setEditInterview(prev => ({
												...prev,
												scheduledAt: e.target.value,
											}))
										}
									/>
								</div>
							</div>

							<div>
								<Label htmlFor='edit-description'>
									Description (Optional)
								</Label>
								<Textarea
									id='edit-description'
									value={editInterview.description}
									onChange={e =>
										setEditInterview(prev => ({
											...prev,
											description: e.target.value,
										}))
									}
									placeholder='Additional notes about the interview...'
									rows={3}
								/>
							</div>

							<div className='flex justify-end space-x-4 pt-4'>
								<Button
									variant='outline'
									onClick={() => setIsEditModalOpen(false)}
									disabled={isSaving}
								>
									Cancel
								</Button>
								<Button
									onClick={handleEditInterview}
									disabled={
										isSaving ||
										!editInterview.title ||
										!editInterview.candidateName
									}
								>
									{isSaving && (
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									)}
									Update Interview
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>

				{/* Delete Confirmation Dialog */}
				<AlertDialog
					open={isDeleteDialogOpen}
					onOpenChange={setIsDeleteDialogOpen}
				>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Delete Interview
							</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to delete this interview
								with{' '}
								<span className='font-medium'>
									{selectedInterview?.candidateName}
								</span>
								? This action cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isSaving}>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDeleteInterview}
								disabled={isSaving}
								className='bg-red-600 hover:bg-red-700'
							>
								{isSaving && (
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								)}
								Delete Interview
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</MainLayout>
	)
}
