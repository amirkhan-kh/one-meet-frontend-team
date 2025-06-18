import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { AddCandidateModal } from './candidaterec-components/add-candidate-modal'
import { BulkActions } from './candidaterec-components/bulk-actions'
import { FilterBar } from './candidaterec-components/filterbar'
import { Toolbar } from './candidaterec-components/toolbar'
import candidateApi from './lib/api'
import { convertApiToCandidate } from './types/candidate'
import { MainLayout } from './layout/main-layout'
import { EditCandidateModal } from './candidaterec-components/edit-candidate-modal'
import { CandidateDetailModal } from './candidaterec-components/candidate-detail-modal'
import { CandidateCard } from './candidaterec-components/candidate-card'

export default function CandidatesPage() {
	// State
	const [candidates, setCandidates] = useState([])
	const [selectedCandidates, setSelectedCandidates] = useState([])
	const [selectedCandidate, setSelectedCandidate] = useState(null)
	const [editingCandidate, setEditingCandidate] = useState(null)

	// Modals
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

	// Loading states
	const [isLoading, setIsLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)

	// View settings
	const [viewMode, setViewMode] = useState('grid')
	const [sortBy, setSortBy] = useState('name')
	const [sortOrder, setSortOrder] = useState('asc')

	// Filters
	const [filters, setFilters] = useState({
		search: '',
		status: 'all',
		position: 'all',
		location: 'all',
		experience: 'all',
		score: 'all',
		dateRange: 'all',
	})

	useEffect(() => {
		loadCandidates()
	}, [])

	// Load candidates from API
	const loadCandidates = async () => {
		try {
			setIsLoading(true)
			const apiCandidates = await candidateApi.getAll()
			const converted = apiCandidates.map(convertApiToCandidate)
			setCandidates(converted)
			toast.success(`Loaded ${converted.length} candidates`)
		} catch (error) {
			toast.error('Failed to load candidates')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	// Filter and sort candidates
	const filteredAndSortedCandidates = useMemo(() => {
		const filtered = candidates.filter(candidate => {
			// Search filter
			if (filters.search) {
				const searchLower = filters.search.toLowerCase()
				const matchesSearch =
					candidate.name.toLowerCase().includes(searchLower) ||
					candidate.email.toLowerCase().includes(searchLower) ||
					candidate.position?.toLowerCase().includes(searchLower) ||
					candidate.career_goals?.toLowerCase().includes(searchLower)

				if (!matchesSearch) return false
			}

			// Status filter
			if (
				filters.status !== 'all' &&
				candidate.status !== filters.status
			) {
				return false
			}

			// Position filter
			if (filters.position !== 'all') {
				const positionMatch = candidate.position
					?.toLowerCase()
					.includes(filters.position.toLowerCase())
				if (!positionMatch) return false
			}

			// Experience filter
			if (filters.experience !== 'all') {
				const experienceMatch = candidate.experience
					?.toLowerCase()
					.includes(filters.experience.toLowerCase())
				if (!experienceMatch) return false
			}

			// Score filter
			if (filters.score !== 'all' && candidate.score) {
				const score = candidate.score
				if (filters.score === 'high' && score < 80) return false
				if (filters.score === 'medium' && (score < 60 || score >= 80))
					return false
				if (filters.score === 'low' && score >= 60) return false
			}

			return true
		})

		// Sort
		filtered.sort((a, b) => {
			let aValue = a[sortBy]
			let bValue = b[sortBy]

			if (sortBy === 'score') {
				aValue = a.score || 0
				bValue = b.score || 0
			} else if (typeof aValue === 'string') {
				aValue = aValue.toLowerCase()
				bValue = bValue?.toLowerCase() || ''
			}

			if (sortOrder === 'asc') {
				return aValue > bValue ? 1 : -1
			} else {
				return aValue < bValue ? 1 : -1
			}
		})

		return filtered
	}, [candidates, filters, sortBy, sortOrder])

	// Handlers
	const handleAddCandidate = async form => {
		setIsSubmitting(true)
		try {
			const apiData = {
				user_profileId: form.user_profileId,
				resume_url: form.resume_url,
				career_goals: form.career_goals,
			}

			const created = await candidateApi.create(apiData)
			const newCandidate = {
				...convertApiToCandidate(created),
				name: form.name || `Candidate ${created.id.slice(0, 8)}`,
				email:
					form.email ||
					`candidate${created.id.slice(0, 8)}@example.com`,
				phone: form.phone,
				position: form.position,
				location: form.location,
				experience: form.experience,
				skills: form.skills
					?.split(',')
					.map(s => s.trim())
					.filter(Boolean),
				score: form.score,
			}

			setCandidates(prev => [newCandidate, ...prev])
			setIsAddModalOpen(false)
			toast.success('Candidate added successfully')
		} catch (error) {
			toast.error('Failed to add candidate')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleEditCandidate = async (id, form) => {
		setIsSubmitting(true)
		try {
			const apiData = {
				user_profileId: form.user_profileId,
				resume_url: form.resume_url,
				career_goals: form.career_goals,
			}

			await candidateApi.update(id, apiData)

			setCandidates(prev =>
				prev.map(candidate =>
					candidate.id === id
						? {
								...candidate,
								name: form.name,
								email: form.email,
								phone: form.phone,
								position: form.position,
								location: form.location,
								experience: form.experience,
								skills: form.skills
									?.split(',')
									.map(s => s.trim())
									.filter(Boolean),
								score: form.score,
								user_profileId: form.user_profileId,
								resume_url: form.resume_url,
								career_goals: form.career_goals,
						  }
						: candidate
				)
			)

			setIsEditModalOpen(false)
			setEditingCandidate(null)
			toast.success('Candidate updated successfully')
		} catch (error) {
			toast.error('Failed to update candidate')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleDeleteCandidate = async id => {
		try {
			await candidateApi.delete(id)
			setCandidates(prev => prev.filter(c => c.id !== id))
			setSelectedCandidates(prev => prev.filter(cId => cId !== id))
			toast.success('Candidate deleted')
		} catch (error) {
			toast.error('Failed to delete candidate')
		}
	}

	const handleSelectCandidate = id => {
		setSelectedCandidates(prev =>
			prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
		)
	}

	const handleSelectAll = () => {
		if (selectedCandidates.length === filteredAndSortedCandidates.length) {
			setSelectedCandidates([])
		} else {
			setSelectedCandidates(filteredAndSortedCandidates.map(c => c.id))
		}
	}

	const handleBulkStatusUpdate = status => {
		setCandidates(prev =>
			prev.map(candidate =>
				selectedCandidates.includes(candidate.id)
					? { ...candidate, status: status }
					: candidate
			)
		)
		setSelectedCandidates([])
		toast.success(`Updated ${selectedCandidates.length} candidates`)
	}

	const handleBulkDelete = async () => {
		try {
			for (const id of selectedCandidates) {
				await candidateApi.delete(id)
			}
			setCandidates(prev =>
				prev.filter(c => !selectedCandidates.includes(c.id))
			)
			setSelectedCandidates([])
			toast.success(`Deleted ${selectedCandidates.length} candidates`)
		} catch (error) {
			toast.error('Failed to delete candidates')
		}
	}

	const handleExport = () => {
		const csvContent = [
			[
				'Name',
				'Email',
				'Phone',
				'Position',
				'Status',
				'Score',
				'Location',
				'Experience',
			].join(','),
			...filteredAndSortedCandidates.map(c =>
				[
					c.name,
					c.email,
					c.phone || '',
					c.position || '',
					c.status,
					c.score || '',
					c.location || '',
					c.experience || '',
				].join(',')
			),
		].join('\n')

		const blob = new Blob([csvContent], { type: 'text/csv' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'candidates.csv'
		a.click()
		URL.revokeObjectURL(url)
		toast.success('Candidates exported successfully')
	}

	return (
		<MainLayout>
			<div className='space-y-6'>
				{/* Header */}
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-3xl font-bold text-gray-900'>
							Candidates
						</h1>
						<p className='text-gray-600 mt-1'>
							Manage your candidate pipeline with modern tools
						</p>
					</div>

					<div className='flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border'>
						<div className='w-2 h-2 bg-green-500 rounded-full'></div>
						<span>Connected to API</span>
					</div>
				</div>

				{/* Filters */}
				<FilterBar
					filters={filters}
					onFiltersChange={setFilters}
					onClearFilters={() =>
						setFilters({
							search: '',
							status: 'all',
							position: 'all',
							location: 'all',
							experience: 'all',
							score: 'all',
							dateRange: 'all',
						})
					}
					totalCount={candidates.length}
					filteredCount={filteredAndSortedCandidates.length}
				/>

				{/* Toolbar */}
				<Toolbar
					viewMode={viewMode}
					onViewModeChange={setViewMode}
					sortBy={sortBy}
					sortOrder={sortOrder}
					onSortChange={(newSortBy, newSortOrder) => {
						setSortBy(newSortBy)
						setSortOrder(newSortOrder)
					}}
					onRefresh={loadCandidates}
					onAddCandidate={() => setIsAddModalOpen(true)}
					onExport={handleExport}
					onImport={() => toast.info('Import feature coming soon')}
					isLoading={isLoading}
				/>

				{/* Bulk Actions */}
				<BulkActions
					selectedCount={selectedCandidates.length}
					totalCount={filteredAndSortedCandidates.length}
					onSelectAll={handleSelectAll}
					onClearSelection={() => setSelectedCandidates([])}
					onBulkStatusUpdate={handleBulkStatusUpdate}
					onBulkDelete={handleBulkDelete}
					onBulkEmail={() =>
						toast.info('Bulk email feature coming soon')
					}
					onBulkArchive={() =>
						toast.info('Bulk archive feature coming soon')
					}
				/>

				{/* Candidates Grid/List */}
				{isLoading ? (
					<div
						className={`${
							viewMode === 'grid'
								? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
								: 'space-y-4'
						}`}
					>
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								key={i}
								className='bg-white p-6 rounded-lg border border-gray-100 animate-pulse'
							>
								<div className='h-4 bg-gray-200 rounded mb-4'></div>
								<div className='h-3 bg-gray-200 rounded mb-2'></div>
								<div className='h-3 bg-gray-200 rounded mb-4'></div>
								<div className='h-8 bg-gray-200 rounded'></div>
							</div>
						))}
					</div>
				) : filteredAndSortedCandidates.length === 0 ? (
					<div className='text-center py-12 bg-white rounded-lg border border-gray-200'>
						<div className='text-gray-400 text-lg mb-2'>
							No candidates found
						</div>
						<p className='text-gray-500 mb-4'>
							{candidates.length === 0
								? 'Add your first candidate to get started'
								: 'Try adjusting your filters or search terms'}
						</p>
						{candidates.length === 0 && (
							<button
								onClick={() => setIsAddModalOpen(true)}
								className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
							>
								Add First Candidate
							</button>
						)}
					</div>
				) : (
					<div
						className={
							viewMode === 'grid'
								? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
								: 'space-y-4'
						}
					>
						{filteredAndSortedCandidates.map(candidate => (
							<CandidateCard
								key={candidate.id}
								candidate={candidate}
								isSelected={selectedCandidates.includes(
									candidate.id
								)}
								onSelect={handleSelectCandidate}
								onView={candidate => {
									setSelectedCandidate(candidate)
									setIsDetailModalOpen(true)
								}}
								onEdit={candidate => {
									setEditingCandidate(candidate)
									setIsEditModalOpen(true)
								}}
								onDelete={handleDeleteCandidate}
								viewMode={viewMode}
							/>
						))}
					</div>
				)}

				{/* Modals */}
				<AddCandidateModal
					isOpen={isAddModalOpen}
					onClose={() => setIsAddModalOpen(false)}
					onSubmit={handleAddCandidate}
					isLoading={isSubmitting}
				/>

				<EditCandidateModal
					candidate={editingCandidate}
					isOpen={isEditModalOpen}
					onClose={() => {
						setIsEditModalOpen(false)
						setEditingCandidate(null)
					}}
					onSubmit={handleEditCandidate}
					isLoading={isSubmitting}
				/>

				<CandidateDetailModal
					candidate={selectedCandidate}
					isOpen={isDetailModalOpen}
					onClose={() => {
						setIsDetailModalOpen(false)
						setSelectedCandidate(null)
					}}
				/>
			</div>
		</MainLayout>
	)
}
