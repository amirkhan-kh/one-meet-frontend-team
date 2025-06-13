import { MainLayout } from '@/components/dashboards/RecruiterDashboard/components/main-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { api } from '@/lib/api'
import {
	Archive,
	Briefcase,
	CalendarIcon,
	Check,
	CheckCircle,
	ChevronDown,
	Clock,
	Download,
	Edit,
	Eye,
	FilterIcon,
	Grid,
	List,
	Loader2,
	Mail,
	MapPin,
	MessageSquare,
	MoreHorizontal,
	Phone,
	Plus,
	RefreshCw,
	Search,
	Send,
	SortAsc,
	SortDesc,
	Star,
	Trash2,
	TrendingUp,
	UserCheck,
	Users,
	X,
	XCircle
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

const statusConfig = {
	selected: {
		color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
		icon: CheckCircle,
		label: 'Selected',
	},
	pending: {
		color: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
		icon: Clock,
		label: 'Pending',
	},
	rejected: {
		color: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
		icon: XCircle,
		label: 'Rejected',
	},
	active: {
		color: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
		icon: Users,
		label: 'Active',
	},
}

function CandidateSkeleton() {
	return (
		<Card className='shadow-sm border-gray-200'>
			<CardContent className='p-4 sm:p-6'>
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
					<div className='flex-1'>
						<div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-3'>
							<Skeleton className='h-6 w-48' />
							<div className='flex gap-2'>
								<Skeleton className='h-6 w-20' />
								<Skeleton className='h-6 w-24' />
							</div>
						</div>
						<div className='flex items-center gap-2 mb-2'>
							<Skeleton className='h-4 w-4' />
							<Skeleton className='h-4 w-40' />
						</div>
						<div className='flex items-center gap-2'>
							<Skeleton className='h-4 w-4' />
							<Skeleton className='h-4 w-32' />
						</div>
					</div>
					<div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6'>
						<div className='text-center sm:text-right'>
							<Skeleton className='h-3 w-8 mb-1 mx-auto sm:mx-0' />
							<Skeleton className='h-8 w-12 mx-auto sm:mx-0' />
						</div>
						<div className='flex gap-2'>
							<Skeleton className='h-10 w-24' />
							<Skeleton className='h-10 w-10' />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default function CandidateRec() {
	const [candidates, setCandidates] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')
	const [typeFilter, setTypeFilter] = useState('all')
	const [scoreFilter, setScoreFilter] = useState('all')
	const [selectedCandidates, setSelectedCandidates] = useState([])
	const [selectedCandidate, setSelectedCandidate] = useState(null)
	const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
	const [addCandidateModalOpen, setAddCandidateModalOpen] = useState(false)
	const [bulkActionsOpen, setBulkActionsOpen] = useState(false)
	const [viewMode, setViewMode] = useState('list')
	const [sortBy] = useState('name')
	const [sortOrder, setSortOrder] = useState('asc')
	const [isLoading, setIsLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
	const [newNote, setNewNote] = useState('')
	const [isAddingNote, setIsAddingNote] = useState(false)

	const [newCandidateForm, setNewCandidateForm] = useState({
		name: '',
		email: '',
		phone: '',
		status: 'pending',
		position: '',
		score: '',
		location: '',
		experience: '',
		education: '',
		skills: '',
		notes: '',
		expectedSalary: '',
		availability: '',
	})

	// Enhanced mock data with feedback
	const enhancedMockCandidates = [
		{
			id: '1',
			name: 'Alice Thompson',
			email: 'alice@example.com',
			phone: '+1 (555) 123-4567',
			status: 'selected',
			score: 87,
			interviewDate: 'May 10, 2025',
			position: 'Senior Developer',
			createdAt: '2024-01-01T00:00:00Z',
			location: 'San Francisco, CA',
			experience: '5+ years',
			education: 'BS Computer Science',
			skills: ['React', 'TypeScript', 'Node.js', 'Python'],
			rating: 4.5,
			lastContact: '2024-01-15',
			source: 'LinkedIn',
			expectedSalary: '$120,000',
			availability: '2 weeks notice',
			feedback: {
				technicalSkills: {
					score: 8,
					description:
						'Strong technical knowledge of required technologies. Demonstrated good problem-solving skills during coding challenges.',
				},
				communication: {
					score: 7,
					description:
						'Articulated ideas clearly but could improve on explaining complex concepts to non-technical team members.',
				},
				culturalFit: {
					score: 9,
					description:
						'Values align well with company culture. Shows enthusiasm for collaborative work and continuous learning.',
				},
				experienceRelevance: {
					score: 8,
					description:
						'Previous experience highly relevant to the role. Has worked on similar projects and technologies.',
				},
				interviewerNotes:
					"The candidate shows strong potential and would be a good addition to the team. Their technical skills match our requirements, and they demonstrated a genuine interest in our company's mission. Some additional training might be needed for specific tools we use, but their learning capability seems high.",
			},
			notes: [
				{
					id: '1',
					content: 'Excellent technical skills, great cultural fit',
					createdAt: '2024-01-10T10:00:00Z',
					author: 'John Recruiter',
				},
			],
		},
		{
			id: '2',
			name: 'Wei Chen',
			email: 'wei@example.com',
			phone: '+1 (555) 234-5678',
			status: 'active',
			score: 78,
			interviewDate: 'May 12, 2025',
			position: 'Frontend Developer',
			createdAt: '2024-01-02T00:00:00Z',
			location: 'New York, NY',
			experience: '3+ years',
			education: 'MS Software Engineering',
			skills: ['Vue.js', 'JavaScript', 'CSS', 'HTML'],
			rating: 4.0,
			lastContact: '2024-01-14',
			source: 'Company Website',
			expectedSalary: '$95,000',
			availability: 'Immediate',
			feedback: {
				technicalSkills: {
					score: 7,
					description:
						'Good understanding of frontend technologies. Needs improvement in advanced JavaScript concepts.',
				},
				communication: {
					score: 8,
					description:
						'Excellent communication skills. Can explain technical concepts clearly to both technical and non-technical audiences.',
				},
				culturalFit: {
					score: 8,
					description:
						'Great team player with positive attitude. Fits well with our collaborative culture.',
				},
				experienceRelevance: {
					score: 7,
					description:
						'Relevant experience but mostly in smaller projects. Would benefit from exposure to larger scale applications.',
				},
				interviewerNotes:
					'Solid candidate with good potential. Strong communication skills and positive attitude. Technical skills are adequate but could use some development in advanced areas.',
			},
			notes: [],
		},
		{
			id: '3',
			name: 'Sarah Johnson',
			email: 'sarah@example.com',
			phone: '+1 (555) 345-6789',
			status: 'pending',
			score: 92,
			interviewDate: 'May 15, 2025',
			position: 'UX Designer',
			createdAt: '2024-01-03T00:00:00Z',
			location: 'Austin, TX',
			experience: '4+ years',
			education: 'BA Design',
			skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping'],
			rating: 4.8,
			lastContact: '2024-01-13',
			source: 'Referral',
			expectedSalary: '$85,000',
			availability: '1 month notice',
			feedback: {
				technicalSkills: {
					score: 9,
					description:
						'Exceptional design skills with strong portfolio. Proficient in all major design tools and methodologies.',
				},
				communication: {
					score: 9,
					description:
						'Outstanding presentation skills. Can articulate design decisions clearly and defend them with solid reasoning.',
				},
				culturalFit: {
					score: 8,
					description:
						'Creative mindset aligns well with our innovation-focused culture. Shows passion for user-centered design.',
				},
				experienceRelevance: {
					score: 9,
					description:
						'Extensive experience in similar roles with impressive portfolio of successful projects.',
				},
				interviewerNotes:
					'Exceptional candidate with outstanding portfolio and presentation skills. Would be a valuable addition to our design team. Highly recommended for hire.',
			},
			notes: [
				{
					id: '2',
					content: 'Outstanding portfolio, very creative',
					createdAt: '2024-01-12T14:00:00Z',
					author: 'Jane Designer',
				},
			],
		},
		{
			id: '4',
			name: 'Michael Rodriguez',
			email: 'michael@example.com',
			phone: '+1 (555) 456-7890',
			status: 'rejected',
			score: 65,
			interviewDate: 'May 18, 2025',
			position: 'Backend Developer',
			createdAt: '2024-01-04T00:00:00Z',
			location: 'Seattle, WA',
			experience: '2+ years',
			education: 'BS Information Technology',
			skills: ['Java', 'Spring', 'MySQL', 'Docker'],
			rating: 3.2,
			lastContact: '2024-01-11',
			source: 'Job Board',
			expectedSalary: '$75,000',
			availability: '3 weeks notice',
			feedback: {
				technicalSkills: {
					score: 6,
					description:
						'Basic understanding of backend technologies but lacks depth in advanced concepts. Struggled with system design questions.',
				},
				communication: {
					score: 6,
					description:
						'Adequate communication but sometimes unclear in explanations. Needs improvement in articulating technical concepts.',
				},
				culturalFit: {
					score: 7,
					description:
						"Seems like a good cultural fit but lacks the enthusiasm and drive we're looking for.",
				},
				experienceRelevance: {
					score: 5,
					description:
						'Limited experience with technologies we use. Would require significant training and mentoring.',
				},
				interviewerNotes:
					'Candidate shows potential but needs more experience and training. Technical skills are below our current requirements. Would recommend gaining more experience before reapplying.',
			},
			notes: [],
		},
	]

	useEffect(() => {
		loadCandidates()
	}, [])

	const loadCandidates = async () => {
		try {
			setIsLoading(true)
			// Try API first, fallback to enhanced mock data
			try {
				const candidatesData = await api.candidate.getAll()
				setCandidates(
					candidatesData.map(c => ({
						...c,
						...enhancedMockCandidates.find(m => m.id === c.id),
					}))
				)
			} catch {
				setCandidates(enhancedMockCandidates)
			}
		} catch {
			toast.error('Failed to load candidates')
		} finally {
			setIsLoading(false)
		}
	}

	const filteredAndSortedCandidates = useMemo(() => {
		const filtered = candidates.filter(candidate => {
			const matchesSearch =
				candidate.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				candidate.email
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				candidate.position
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				candidate.skills?.some(skill =>
					skill.toLowerCase().includes(searchTerm.toLowerCase())
				)

			const matchesStatus =
				statusFilter === 'all' || candidate.status === statusFilter
			const matchesType =
				typeFilter === 'all' ||
				candidate.position
					?.toLowerCase()
					.includes(typeFilter.toLowerCase())

			const matchesScore =
				scoreFilter === 'all' ||
				(scoreFilter === 'high' && (candidate.score || 0) >= 80) ||
				(scoreFilter === 'medium' &&
					(candidate.score || 0) >= 60 &&
					(candidate.score || 0) < 80) ||
				(scoreFilter === 'low' && (candidate.score || 0) < 60)

			return matchesSearch && matchesStatus && matchesType && matchesScore
		})

		// Sort candidates
		filtered.sort((a, b) => {
			let aValue = a[sortBy]
			let bValue = b[sortBy]

			if (sortBy === 'score') {
				aValue = a.score || 0
				bValue = b.score || 0
			} else if (sortBy === 'rating') {
				aValue = a.rating || 0
				bValue = b.rating || 0
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
	}, [
		candidates,
		searchTerm,
		statusFilter,
		typeFilter,
		scoreFilter,
		sortBy,
		sortOrder,
	])

	const getScoreColor = score => {
		if (score >= 90) return 'text-green-600 font-bold'
		if (score >= 80) return 'text-blue-600 font-semibold'
		if (score >= 70) return 'text-yellow-600 font-medium'
		return 'text-red-600 font-medium'
	}

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

	const openFeedbackModal = candidate => {
		setSelectedCandidate(candidate)
		setFeedbackModalOpen(true)
	}

	const closeFeedbackModal = () => {
		setSelectedCandidate(null)
		setFeedbackModalOpen(false)
		setNewNote('')
	}

	const openAddCandidateModal = () => {
		setAddCandidateModalOpen(true)
	}

	const closeAddCandidateModal = () => {
		setAddCandidateModalOpen(false)
		setNewCandidateForm({
			name: '',
			email: '',
			phone: '',
			status: 'pending',
			position: '',
			score: '',
			location: '',
			experience: '',
			education: '',
			skills: '',
			notes: '',
			expectedSalary: '',
			availability: '',
		})
	}

	const handleInputChange = (field, value) => {
		setNewCandidateForm(prev => ({
			...prev,
			[field]: value,
		}))
	}

	const handleSubmitCandidate = async e => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const newCandidate = {
				id: Date.now().toString(),
				name: newCandidateForm.name,
				email: newCandidateForm.email,
				phone: newCandidateForm.phone,
				status: newCandidateForm.status,
				position: newCandidateForm.position,
				score: Number.parseInt(newCandidateForm.score) || 0,
				interviewDate: new Date().toLocaleDateString(),
				createdAt: new Date().toISOString(),
				location: newCandidateForm.location,
				experience: newCandidateForm.experience,
				education: newCandidateForm.education,
				skills: newCandidateForm.skills
					.split(',')
					.map(s => s.trim())
					.filter(Boolean),
				expectedSalary: newCandidateForm.expectedSalary,
				availability: newCandidateForm.availability,
				rating: 0,
				lastContact: new Date().toISOString().split('T')[0],
				source: 'Manual Entry',
				notes: newCandidateForm.notes
					? [
							{
								id: '1',
								content: newCandidateForm.notes,
								createdAt: new Date().toISOString(),
								author: 'Current User',
							},
					  ]
					: [],
			}

			setCandidates(prev => [newCandidate, ...prev])
			closeAddCandidateModal()

			toast.success('Candidate Added Successfully', {
				description: `${newCandidate.name} has been added to the candidates list.`,
			})
		} catch {
			toast.error('Failed to add candidate')
		} finally {
			setIsSubmitting(false)
		}
	}

	const updateCandidateStatus = async (candidateId, newStatus) => {
		if (!selectedCandidate) return

		setIsUpdatingStatus(true)

		try {
			// Update candidates list
			setCandidates(prev =>
				prev.map(candidate =>
					candidate.id === candidateId
						? {
								...candidate,
								status: newStatus,
								lastContact: new Date()
									.toISOString()
									.split('T')[0],
						  }
						: candidate
				)
			)

			// Update the selected candidate as well
			setSelectedCandidate(prev =>
				prev
					? {
							...prev,
							status: newStatus,
							lastContact: new Date().toISOString().split('T')[0],
					  }
					: null
			)

			toast.success('Status Updated Successfully', {
				description: `Candidate status has been updated to ${statusConfig[newStatus].label}.`,
			})
		} catch {
			toast.error('Failed to update status', {
				description: 'Please try again later.',
			})
		} finally {
			setIsUpdatingStatus(false)
		}
	}

	const handleDeleteCandidate = async candidateId => {
		try {
			setCandidates(prev =>
				prev.filter(candidate => candidate.id !== candidateId)
			)
			toast.success('Candidate deleted successfully')
		} catch {
			toast.error('Failed to delete candidate')
		}
	}

	const handleBulkAction = async action => {
		if (selectedCandidates.length === 0) {
			toast.error('Please select candidates first')
			return
		}

		try {
			switch (action) {
				case 'delete':
					setCandidates(prev =>
						prev.filter(c => !selectedCandidates.includes(c.id))
					)
					toast.success(
						`Deleted ${selectedCandidates.length} candidates`
					)
					break
				case 'archive':
					setCandidates(prev =>
						prev.map(c =>
							selectedCandidates.includes(c.id)
								? { ...c, status: 'rejected' }
								: c
						)
					)
					toast.success(
						`Archived ${selectedCandidates.length} candidates`
					)
					break
				case 'activate':
					setCandidates(prev =>
						prev.map(c =>
							selectedCandidates.includes(c.id)
								? { ...c, status: 'active' }
								: c
						)
					)
					toast.success(
						`Activated ${selectedCandidates.length} candidates`
					)
					break
			}
			setSelectedCandidates([])
			setBulkActionsOpen(false)
		} catch {
			toast.error('Failed to perform bulk action')
		}
	}

	const handleSelectCandidate = candidateId => {
		setSelectedCandidates(prev =>
			prev.includes(candidateId)
				? prev.filter(id => id !== candidateId)
				: [...prev, candidateId]
		)
	}

	const handleSelectAll = () => {
		if (selectedCandidates.length === filteredAndSortedCandidates.length) {
			setSelectedCandidates([])
		} else {
			setSelectedCandidates(filteredAndSortedCandidates.map(c => c.id))
		}
	}

	const addNote = async () => {
		if (!selectedCandidate || !newNote.trim()) return

		setIsAddingNote(true)
		try {
			const note = {
				id: Date.now().toString(),
				content: newNote.trim(),
				createdAt: new Date().toISOString(),
				author: 'Current User',
			}

			setCandidates(prev =>
				prev.map(c =>
					c.id === selectedCandidate.id
						? { ...c, notes: [...(c.notes || []), note] }
						: c
				)
			)

			setSelectedCandidate(prev =>
				prev ? { ...prev, notes: [...(prev.notes || []), note] } : null
			)
			setNewNote('')
			toast.success('Note added successfully')
		} catch {
			toast.error('Failed to add note')
		} finally {
			setIsAddingNote(false)
		}
	}

	const exportCandidates = () => {
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

	const clearFilters = () => {
		setSearchTerm('')
		setStatusFilter('all')
		setTypeFilter('all')
		setScoreFilter('all')
	}

	return (
		<MainLayout>
			<div className='space-y-6'>
				{/* Header */}
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
					<div>
						<h1 className='text-2xl font-bold text-gray-900'>
							Candidates
						</h1>
						<p className='text-gray-600'>
							View and manage your candidates and their
							information
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<Button
							variant='outline'
							onClick={exportCandidates}
							className='flex items-center gap-2 cursor-pointer hover:bg-gray-50'
						>
							<Download className='w-4 h-4' />
							Export
						</Button>
						
						<Button
							onClick={openAddCandidateModal}
							className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer'
						>
							<Plus className='w-4 h-4' />
							Add New Candidate
						</Button>
					</div>
				</div>

				{/* Advanced Filters */}
				<Card className='shadow-sm border-gray-200'>
					<CardContent className='p-4 sm:p-6'>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-700'>
									Search
								</label>
								<div className='relative'>
									<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
									<Input
										placeholder='Search candidates...'
										value={searchTerm}
										onChange={e =>
											setSearchTerm(e.target.value)
										}
										className='pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-700'>
									Status
								</label>
								<Select
									value={statusFilter}
									onValueChange={setStatusFilter}
								>
									<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500 cursor-pointer w-full'>
										<SelectValue placeholder='All statuses' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem
											value='all'
											className='cursor-pointer '
										>
											All statuses
										</SelectItem>
										<SelectItem
											value='active'
											className='cursor-pointer'
										>
											Active
										</SelectItem>
										<SelectItem
											value='selected'
											className='cursor-pointer'
										>
											Selected
										</SelectItem>
										<SelectItem
											value='pending'
											className='cursor-pointer'
										>
											Pending
										</SelectItem>
										<SelectItem
											value='rejected'
											className='cursor-pointer'
										>
											Rejected
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-700'>
									Position Type
								</label>
								<Select
									value={typeFilter}
									onValueChange={setTypeFilter}
								>
									<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500 cursor-pointer w-full'>
										<SelectValue placeholder='All types' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem
											value='all'
											className='cursor-pointer'
										>
											All types
										</SelectItem>
										<SelectItem
											value='developer'
											className='cursor-pointer'
										>
											Developer
										</SelectItem>
										<SelectItem
											value='designer'
											className='cursor-pointer'
										>
											Designer
										</SelectItem>
										<SelectItem
											value='manager'
											className='cursor-pointer'
										>
											Manager
										</SelectItem>
										<SelectItem
											value='analyst'
											className='cursor-pointer'
										>
											Analyst
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-medium text-gray-700'>
									Actions
								</label>
								<div className='flex gap-2'>
									<Button
										onClick={clearFilters}
										variant='outline'
										className='flex-1 border-gray-300 hover:bg-gray-50 cursor-pointer'
									>
										<FilterIcon className='w-4 h-4 mr-2' />
										Clear
									</Button>
									<Button
										onClick={() =>
											setSortOrder(
												sortOrder === 'asc'
													? 'desc'
													: 'asc'
											)
										}
										variant='outline'
										className='px-3 cursor-pointer hover:bg-gray-50'
									>
										{sortOrder === 'asc' ? (
											<SortAsc className='w-4 h-4' />
										) : (
											<SortDesc className='w-4 h-4' />
										)}
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Toolbar */}
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<Checkbox
								checked={
									selectedCandidates.length ===
										filteredAndSortedCandidates.length &&
									filteredAndSortedCandidates.length > 0
								}
								onCheckedChange={handleSelectAll}
								className='cursor-pointer'
							/>
							<span className='text-sm text-gray-600'>
								{selectedCandidates.length > 0
									? `${selectedCandidates.length} selected`
									: 'Select all'}
							</span>
						</div>

						{selectedCandidates.length > 0 && (
							<DropdownMenu
								open={bulkActionsOpen}
								onOpenChange={setBulkActionsOpen}
							>
								<DropdownMenuTrigger asChild>
									<Button
										variant='outline'
										className='flex items-center gap-2 cursor-pointer hover:bg-gray-50'
									>
										<UserCheck className='w-4 h-4' />
										Bulk Actions
										<ChevronDown className='w-4 h-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem
										onClick={() =>
											handleBulkAction('activate')
										}
										className='cursor-pointer'
									>
										<CheckCircle className='mr-2 h-4 w-4 text-green-600' />
										Activate Selected
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											handleBulkAction('archive')
										}
										className='cursor-pointer'
									>
										<Archive className='mr-2 h-4 w-4 text-orange-600' />
										Archive Selected
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() =>
											handleBulkAction('delete')
										}
										className='text-red-600 cursor-pointer'
									>
										<Trash2 className='mr-2 h-4 w-4' />
										Delete Selected
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>

					<div className='flex items-center gap-2'>
						<span className='text-sm text-gray-600'>
							Showing {filteredAndSortedCandidates.length} of{' '}
							{candidates.length} candidates
						</span>
						<div className='flex items-center border rounded-lg'>
							<Button
								variant={
									viewMode === 'list' ? 'default' : 'ghost'
								}
								size='sm'
								onClick={() => setViewMode('list')}
								className='rounded-r-none cursor-pointer'
							>
								<List className='w-4 h-4' />
							</Button>
							<Button
								variant={
									viewMode === 'grid' ? 'default' : 'ghost'
								}
								size='sm'
								onClick={() => setViewMode('grid')}
								className='rounded-l-none cursor-pointer'
							>
								<Grid className='w-4 h-4' />
							</Button>
						</div>
						<Button
							variant='outline'
							size='sm'
							onClick={loadCandidates}
							className='cursor-pointer hover:bg-gray-50'
						>
							<RefreshCw className='w-4 h-4' />
						</Button>
					</div>
				</div>

				{/* Candidates List */}
				<div
					className={
						viewMode === 'grid'
							? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
							: 'space-y-4'
					}
				>
					{isLoading ? (
						Array.from({ length: 4 }).map((_, index) => (
							<CandidateSkeleton key={index} />
						))
					) : filteredAndSortedCandidates.length === 0 ? (
						<Card className='shadow-sm border-gray-200 col-span-full'>
							<CardContent className='p-8 text-center'>
								<div className='text-gray-400 mb-2'>
									<Search className='w-12 h-12 mx-auto' />
								</div>
								<h3 className='text-lg font-medium text-gray-900 mb-1'>
									No candidates found
								</h3>
								<p className='text-gray-600'>
									Try adjusting your search criteria or
									filters.
								</p>
							</CardContent>
						</Card>
					) : (
						filteredAndSortedCandidates.map(candidate => {
							const StatusIcon =
								statusConfig[candidate.status].icon

							return (
								<Card
									key={candidate.id}
									className={`shadow-sm border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer ${
										selectedCandidates.includes(
											candidate.id
										)
											? 'ring-2 ring-blue-500 border-blue-500'
											: ''
									}`}
								>
									<CardContent className='p-4 sm:p-6'>
										<div className='flex items-start gap-3'>
											<Checkbox
												checked={selectedCandidates.includes(
													candidate.id
												)}
												onCheckedChange={() =>
													handleSelectCandidate(
														candidate.id
													)
												}
												className='mt-1 cursor-pointer'
											/>

											<div className='flex-1 min-w-0'>
												<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
													<div className='flex-1'>
														<div className='flex items-center gap-2 mb-2'>
															<h3 className='text-lg font-semibold text-gray-900 truncate'>
																{candidate.name}
															</h3>
															{candidate.rating && (
																<div className='flex items-center gap-1'>
																	{getRatingStars(
																		candidate.rating
																	)}
																	<span className='text-sm text-gray-500'>
																		(
																		{
																			candidate.rating
																		}
																		)
																	</span>
																</div>
															)}
														</div>

														<div className='flex flex-wrap gap-2 mb-3'>
															<Badge
																variant='outline'
																className={`${
																	statusConfig[
																		candidate
																			.status
																	].color
																} capitalize font-medium flex items-center gap-1 cursor-pointer transition-colors`}
																title={`Status: ${
																	statusConfig[
																		candidate
																			.status
																	].label
																}`}
															>
																<StatusIcon className='w-3 h-3' />
																{
																	candidate.status
																}
															</Badge>
															{candidate.position && (
																<Badge
																	variant='outline'
																	className='bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 cursor-pointer transition-colors'
																	title={`Position: ${candidate.position}`}
																>
																	<Briefcase className='w-3 h-3 mr-1' />
																	{
																		candidate.position
																	}
																</Badge>
															)}
															{candidate.experience && (
																<Badge
																	variant='outline'
																	className='bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 cursor-pointer transition-colors'
																	title={`Experience: ${candidate.experience}`}
																>
																	<Clock className='w-3 h-3 mr-1' />
																	{
																		candidate.experience
																	}
																</Badge>
															)}
														</div>

														<div className='space-y-1 text-sm text-gray-600'>
															<div className='flex items-center gap-2'>
																<Mail className='w-4 h-4' />
																<span className='truncate'>
																	{
																		candidate.email
																	}
																</span>
															</div>
															{candidate.phone && (
																<div className='flex items-center gap-2'>
																	<Phone className='w-4 h-4' />
																	<span>
																		{
																			candidate.phone
																		}
																	</span>
																</div>
															)}
															{candidate.location && (
																<div className='flex items-center gap-2'>
																	<MapPin className='w-4 h-4' />
																	<span>
																		{
																			candidate.location
																		}
																	</span>
																</div>
															)}
															{candidate.expectedSalary && (
																<div className='flex items-center gap-2'>
																	<TrendingUp className='w-4 h-4' />
																	<span>
																		{
																			candidate.expectedSalary
																		}
																	</span>
																</div>
															)}
														</div>

														{candidate.skills &&
															candidate.skills
																.length > 0 && (
																<div className='mt-3'>
																	<div className='flex flex-wrap gap-1'>
																		{candidate.skills
																			.slice(
																				0,
																				3
																			)
																			.map(
																				(
																					skill,
																					index
																				) => (
																					<Badge
																						key={
																							index
																						}
																						variant='secondary'
																						className='text-xs cursor-pointer hover:bg-gray-200 transition-colors'
																						title={
																							skill
																						}
																					>
																						{
																							skill
																						}
																					</Badge>
																				)
																			)}
																		{candidate
																			.skills
																			.length >
																			3 && (
																			<Badge
																				variant='secondary'
																				className='text-xs cursor-pointer hover:bg-gray-200 transition-colors'
																				title={`${candidate.skills
																					.slice(
																						3
																					)
																					.join(
																						', '
																					)}`}
																			>
																				+
																				{candidate
																					.skills
																					.length -
																					3}{' '}
																				more
																			</Badge>
																		)}
																	</div>
																</div>
															)}
													</div>

													<div className='flex flex-col items-end gap-3'>
														{candidate.score && (
															<div className='text-center'>
																<div className='text-xs text-gray-500 mb-1'>
																	Score
																</div>
																<div
																	className={`text-2xl font-bold ${getScoreColor(
																		candidate.score
																	)}`}
																>
																	{
																		candidate.score
																	}
																</div>
															</div>
														)}

														<div className='flex items-center gap-2'>
															<Button
																variant='outline'
																size='sm'
																onClick={() =>
																	openFeedbackModal(
																		candidate
																	)
																}
																className='border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors'
															>
																<Eye className='w-4 h-4 mr-1' />
																View Feedback
															</Button>

															<DropdownMenu>
																<DropdownMenuTrigger
																	asChild
																>
																	<Button
																		variant='outline'
																		size='sm'
																		className='px-2 cursor-pointer hover:bg-gray-50'
																	>
																		<MoreHorizontal className='h-4 w-4' />
																	</Button>
																</DropdownMenuTrigger>
																<DropdownMenuContent align='end'>
																	<DropdownMenuItem
																		onClick={() =>
																			openFeedbackModal(
																				candidate
																			)
																		}
																		className='cursor-pointer'
																	>
																		<Edit className='mr-2 h-4 w-4' />
																		Edit
																		Details
																	</DropdownMenuItem>
																	<DropdownMenuItem className='cursor-pointer'>
																		<Send className='mr-2 h-4 w-4' />
																		Send
																		Email
																	</DropdownMenuItem>
																	<DropdownMenuItem className='cursor-pointer'>
																		<CalendarIcon className='mr-2 h-4 w-4' />
																		Schedule
																		Interview
																	</DropdownMenuItem>
																	<DropdownMenuSeparator />
																	<DropdownMenuItem
																		onClick={() =>
																			handleDeleteCandidate(
																				candidate.id
																			)
																		}
																		className='text-red-600 cursor-pointer'
																	>
																		<Trash2 className='mr-2 h-4 w-4' />
																		Delete
																	</DropdownMenuItem>
																</DropdownMenuContent>
															</DropdownMenu>
														</div>
													</div>
												</div>

												{candidate.lastContact && (
													<div className='mt-3 pt-3 border-t border-gray-100'>
														<div className='flex items-center justify-between text-xs text-gray-500'>
															<span>
																Last contact:{' '}
																{new Date(
																	candidate.lastContact
																).toLocaleDateString()}
															</span>
															{candidate.source && (
																<span>
																	Source:{' '}
																	{
																		candidate.source
																	}
																</span>
															)}
														</div>
													</div>
												)}
											</div>
										</div>
									</CardContent>
								</Card>
							)
						})
					)}
				</div>

				{/* Enhanced Feedback Modal */}
				<Dialog
					open={feedbackModalOpen}
					onOpenChange={setFeedbackModalOpen}
				>
					<DialogContent className='max-w-5xl max-h-[90vh] overflow-y-auto '>
						<DialogHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
							<DialogTitle className='text-xl font-semibold'>
								Candidate Feedback
							</DialogTitle>
						</DialogHeader>

						{selectedCandidate && (
							<div className='space-y-6'>
								{/* Candidate Header */}
								<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b'>
									<div className='flex items-center gap-4'>
										<div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold'>
											{selectedCandidate.name
												.split(' ')
												.map(n => n[0])
												.join('')}
										</div>
										<div>
											<h3 className='text-xl font-semibold'>
												{selectedCandidate.name}
											</h3>
											<p className='text-gray-600'>
												{selectedCandidate.position}
											</p>
											<div className='flex items-center gap-2 mt-1'>
												{selectedCandidate.rating && (
													<div className='flex items-center gap-1'>
														{getRatingStars(
															selectedCandidate.rating
														)}
														<span className='text-sm text-gray-500'>
															(
															{
																selectedCandidate.rating
															}
															)
														</span>
													</div>
												)}
											</div>
										</div>
									</div>

									<div className='flex items-center gap-4'>
										{selectedCandidate.score && (
											<div className='text-center'>
												<div className='text-sm text-gray-500'>
													Overall Score
												</div>
												<div
													className={`text-3xl font-bold ${getScoreColor(
														selectedCandidate.score
													)}`}
												>
													{selectedCandidate.score}
													/100
												</div>
											</div>
										)}
									</div>
								</div>

								{/* Detailed Feedback */}
								{selectedCandidate.feedback && (
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
															selectedCandidate
																.feedback
																.technicalSkills
																.score
														}
														/10
													</span>
												</div>
												<div className='w-full bg-gray-200 rounded-full h-2'>
													<div
														className='bg-blue-600 h-2 rounded-full transition-all duration-300'
														style={{
															width: `${
																selectedCandidate
																	.feedback
																	.technicalSkills
																	.score * 10
															}%`,
														}}
													></div>
												</div>
												<p className='text-sm text-gray-600'>
													{
														selectedCandidate
															.feedback
															.technicalSkills
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
															selectedCandidate
																.feedback
																.communication
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
																selectedCandidate
																	.feedback
																	.communication
																	.score * 10
															}%`,
														}}
													></div>
												</div>
												<p className='text-sm text-gray-600'>
													{
														selectedCandidate
															.feedback
															.communication
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
															selectedCandidate
																.feedback
																.culturalFit
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
																selectedCandidate
																	.feedback
																	.culturalFit
																	.score * 10
															}%`,
														}}
													></div>
												</div>
												<p className='text-sm text-gray-600'>
													{
														selectedCandidate
															.feedback
															.culturalFit
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
															selectedCandidate
																.feedback
																.experienceRelevance
																.score
														}
														/10
													</span>
												</div>
												<div className='w-full bg-gray-200 rounded-full h-2'>
													<div
														className='bg-purple-600 h-2 rounded-full transition-all duration-300'
														style={{
															width: `${
																selectedCandidate
																	.feedback
																	.experienceRelevance
																	.score * 10
															}%`,
														}}
													></div>
												</div>
												<p className='text-sm text-gray-600'>
													{
														selectedCandidate
															.feedback
															.experienceRelevance
															.description
													}
												</p>
											</div>
										</div>
									</div>
								)}

								{/* Interviewer Notes */}
								{selectedCandidate.feedback
									?.interviewerNotes && (
									<div>
										<h4 className='text-lg font-semibold mb-3'>
											Interviewer Notes
										</h4>
										<div className='bg-gray-50 p-4 rounded-lg'>
											<p className='text-sm text-gray-700 leading-relaxed'>
												{
													selectedCandidate.feedback
														.interviewerNotes
												}
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
										{selectedCandidate.notes &&
										selectedCandidate.notes.length > 0 ? (
											<div className='space-y-3'>
												{selectedCandidate.notes.map(
													note => (
														<div
															key={note.id}
															className='bg-gray-50 p-3 rounded-lg'
														>
															<div className='flex items-center justify-between mb-2'>
																<span className='text-sm font-medium text-gray-900'>
																	{
																		note.author
																	}
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
													)
												)}
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
														setNewNote(
															e.target.value
														)
													}
													placeholder='Add a note about this candidate...'
													rows={2}
													className='flex-1'
												/>
												<Button
													onClick={addNote}
													disabled={
														!newNote.trim() ||
														isAddingNote
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
													const Icon = config.icon
													const isCurrentStatus =
														selectedCandidate.status ===
														status
													return (
														<DropdownMenuItem
															key={status}
															onClick={() => {
																if (
																	!isCurrentStatus
																) {
																	updateCandidateStatus(
																		selectedCandidate.id,
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
																	status ===
																	'selected'
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
										onClick={closeFeedbackModal}
										className='border-gray-300 hover:bg-gray-50 flex-1 cursor-pointer'
									>
										Close
									</Button>
								</div>
							</div>
						)}
					</DialogContent>
				</Dialog>

				{/* Add Candidate Modal */}
				<Dialog
					open={addCandidateModalOpen}
					onOpenChange={setAddCandidateModalOpen}
				>
					<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
						<DialogHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
							<DialogTitle className='text-xl font-semibold'>
								Add New Candidate
							</DialogTitle>
							
						</DialogHeader>

						<form
							onSubmit={handleSubmitCandidate}
							className='space-y-6'
						>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='name'>Full Name *</Label>
									<Input
										id='name'
										value={newCandidateForm.name}
										onChange={e =>
											handleInputChange(
												'name',
												e.target.value
											)
										}
										placeholder="Enter candidate's full name"
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='email'>
										Email Address *
									</Label>
									<Input
										id='email'
										type='email'
										value={newCandidateForm.email}
										onChange={e =>
											handleInputChange(
												'email',
												e.target.value
											)
										}
										placeholder='candidate@example.com'
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='phone'>Phone Number</Label>
									<Input
										id='phone'
										value={newCandidateForm.phone}
										onChange={e =>
											handleInputChange(
												'phone',
												e.target.value
											)
										}
										placeholder='+1 (555) 123-4567'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='position'>Position</Label>
									<Input
										id='position'
										value={newCandidateForm.position}
										onChange={e =>
											handleInputChange(
												'position',
												e.target.value
											)
										}
										placeholder='e.g., Senior Developer'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='location'>Location</Label>
									<Input
										id='location'
										value={newCandidateForm.location}
										onChange={e =>
											handleInputChange(
												'location',
												e.target.value
											)
										}
										placeholder='e.g., San Francisco, CA'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='experience'>
										Experience
									</Label>
									<Input
										id='experience'
										value={newCandidateForm.experience}
										onChange={e =>
											handleInputChange(
												'experience',
												e.target.value
											)
										}
										placeholder='e.g., 5+ years'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='education'>Education</Label>
									<Input
										id='education'
										value={newCandidateForm.education}
										onChange={e =>
											handleInputChange(
												'education',
												e.target.value
											)
										}
										placeholder='e.g., BS Computer Science'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='expectedSalary'>
										Expected Salary
									</Label>
									<Input
										id='expectedSalary'
										value={newCandidateForm.expectedSalary}
										onChange={e =>
											handleInputChange(
												'expectedSalary',
												e.target.value
											)
										}
										placeholder='e.g., $120,000'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='availability'>
										Availability
									</Label>
									<Input
										id='availability'
										value={newCandidateForm.availability}
										onChange={e =>
											handleInputChange(
												'availability',
												e.target.value
											)
										}
										placeholder='e.g., 2 weeks notice'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='score'>Initial Score</Label>
									<Input
										id='score'
										type='number'
										min='0'
										max='100'
										value={newCandidateForm.score}
										onChange={e =>
											handleInputChange(
												'score',
												e.target.value
											)
										}
										placeholder='85'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='status'>Status</Label>
									<Select
										value={newCandidateForm.status}
										onValueChange={value =>
											handleInputChange('status', value)
										}
									>
										<SelectTrigger className='cursor-pointer'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												value='pending'
												className='cursor-pointer'
											>
												Pending
											</SelectItem>
											<SelectItem
												value='active'
												className='cursor-pointer'
											>
												Active
											</SelectItem>
											<SelectItem
												value='selected'
												className='cursor-pointer'
											>
												Selected
											</SelectItem>
											<SelectItem
												value='rejected'
												className='cursor-pointer'
											>
												Rejected
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='skills'>
									Skills (comma-separated)
								</Label>
								<Input
									id='skills'
									value={newCandidateForm.skills}
									onChange={e =>
										handleInputChange(
											'skills',
											e.target.value
										)
									}
									placeholder='React, TypeScript, Node.js, Python'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='notes'>Initial Notes</Label>
								<Textarea
									id='notes'
									value={newCandidateForm.notes}
									onChange={e =>
										handleInputChange(
											'notes',
											e.target.value
										)
									}
									placeholder='Add any initial notes about the candidate...'
									rows={3}
								/>
							</div>

							<div className='flex flex-col sm:flex-row gap-3 pt-4 border-t'>
								<Button
									type='submit'
									disabled={
										isSubmitting ||
										!newCandidateForm.name ||
										!newCandidateForm.email
									}
									className='bg-blue-600 hover:bg-blue-700 text-white flex-1 flex items-center gap-2 cursor-pointer'
								>
									{isSubmitting && (
										<Loader2 className='w-4 h-4 animate-spin' />
									)}
									{isSubmitting
										? 'Adding Candidate...'
										: 'Add Candidate'}
								</Button>
								<Button
									type='button'
									variant='outline'
									onClick={closeAddCandidateModal}
									disabled={isSubmitting}
									className='border-gray-300 hover:bg-gray-50 flex-1 cursor-pointer'
								>
									Cancel
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</MainLayout>
	)
}
