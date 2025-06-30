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
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Loader2, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { InterviewDetails } from './interview-details'
import { InterviewForm } from './interview-form'
import { InterviewList } from './interview-list'

import { interviewAPI } from '@/lib/api'
import { toast } from 'sonner'

export const InterviewManagement = () => {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedInterview, setSelectedInterview] = useState(null)
	const [isDeleting, setIsDeleting] = useState(false)
	const [refreshKey, setRefreshKey] = useState(0)
	const [currentUser, setCurrentUser] = useState(null)

	useEffect(() => {
		const userData = interviewAPI.getCurrentUser()
		setCurrentUser(userData)
	}, [])

	const handleCreateSuccess = () => {
		setIsCreateModalOpen(false)
		setRefreshKey(prev => prev + 1)
	}

	const handleView = interview => {
		setSelectedInterview(interview)
		setIsDetailsModalOpen(true)
	}

	const handleEdit = () => {
		// TODO: Implement edit functionality
		toast.info('Edit functionality coming soon')
	}

	const handleDelete = interview => {
		setSelectedInterview(interview)
		setIsDeleteDialogOpen(true)
	}

	const confirmDelete = async () => {
		if (!selectedInterview) return

		try {
			setIsDeleting(true)
			// TODO: Implement delete API call
			await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
			toast.info('Interview deleted coming soon')
			setIsDeleteDialogOpen(false)
			setSelectedInterview(null)
			setRefreshKey(prev => prev + 1)
		} catch (error) {
			toast.error('Failed to delete interview')
			console.error(error)
		} finally {
			setIsDeleting(false)
		}
	}

	if (!currentUser) {
		return (
			<div className='flex items-center justify-center p-8'>
				<Loader2 className='h-6 w-6 animate-spin' />
				<span className='ml-2'>Loading...</span>
			</div>
		)
	}

	const canCreateInterviews =
		currentUser.authRole === 'RECRUITER' || currentUser.authRole === 'ADMIN'

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold text-gray-900'>
						Interview Management
					</h1>
					<p className='text-gray-600'>
						{currentUser.authRole === 'RECRUITER'
							? 'Create and manage interview schedules for your candidates'
							: 'View your scheduled interviews'}
					</p>
				</div>
				{canCreateInterviews && (
					<Button
						onClick={() => setIsCreateModalOpen(true)}
						className='bg-blue-600 hover:bg-blue-700'
					>
						<Plus className='mr-2 h-4 w-4' />
						Create Interview
					</Button>
				)}
			</div>

			{/* Interview List */}
			<InterviewList
				refreshKey={refreshKey}
				onView={handleView}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			{/* Create Interview Modal */}
			{canCreateInterviews && (
				<Dialog
					open={isCreateModalOpen}
					onOpenChange={setIsCreateModalOpen}
				>
					<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
						<DialogHeader>
							<DialogTitle>Create New Interview</DialogTitle>
						</DialogHeader>
						<InterviewForm
							onSuccess={handleCreateSuccess}
							onCancel={() => setIsCreateModalOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			)}

			{/* Interview Details Modal */}
			<Dialog
				open={isDetailsModalOpen}
				onOpenChange={setIsDetailsModalOpen}
			>
				<DialogContent className='max-w-2xl'>
					<DialogHeader>
						<DialogTitle>Interview Details</DialogTitle>
					</DialogHeader>
					{selectedInterview && (
						<InterviewDetails interview={selectedInterview} />
					)}
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Interview</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete the interview with{' '}
							<span className='font-medium'>
								{selectedInterview?.candidateName}
							</span>
							? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleting}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={confirmDelete}
							disabled={isDeleting}
							className='bg-red-600 hover:bg-red-700'
						>
							{isDeleting && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							Delete Interview
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
