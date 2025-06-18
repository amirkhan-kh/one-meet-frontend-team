'use client'

import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

import {
	Building2,
	CheckCircle,
	HelpCircle,
	Info,
	RefreshCw,
} from 'lucide-react'
import { toast } from 'sonner'
import { MainLayout } from '../CandidatesRec/layout/main-layout'

export const CompanyRec=()=> {
	const [companies, setCompanies] = useState([])
	const [selectedCompany, setSelectedCompany] = useState('')
	const [currentCompany, setCurrentCompany] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isSaving, setIsSaving] = useState(false)

	// Mock data - replace with actual API calls
	const mockCompanies = [
		{
			id: '1',
			name: 'Company A',
			description:
				'This company is actively recruiting new talent and has ongoing interview sessions.',
			status: 'active',
			interviewsCount: 12,
			recruitersCount: 5,
			candidatesCount: 24,
			createdAt: '2024-01-01T00:00:00Z',
		},
		{
			id: '2',
			name: 'Company B',
			description:
				'This company is actively recruiting new talent and has ongoing interview sessions.',
			status: 'active',
			interviewsCount: 12,
			recruitersCount: 5,
			candidatesCount: 24,
			createdAt: '2024-01-01T00:00:00Z',
		},
		{
			id: '3',
			name: 'Company C',
			description:
				'This company is actively recruiting new talent and has ongoing interview sessions.',
			status: 'active',
			interviewsCount: 12,
			recruitersCount: 5,
			candidatesCount: 24,
			createdAt: '2024-01-01T00:00:00Z',
		},
	]

	useEffect(() => {
		loadCompanies()
	}, [])

	const loadCompanies = async () => {
		try {
			setIsLoading(true)
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000))
			setCompanies(mockCompanies)

			// Set current company (mock)
			setCurrentCompany(mockCompanies[0])
		} catch (error) {
			toast.error('Failed to load companies')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSaveSelection = async () => {
		if (!selectedCompany) {
			toast.error('Please select a company')
			return
		}

		try {
			setIsSaving(true)

			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1500))

			const company = companies.find(c => c.id === selectedCompany)
			if (company) {
				setCurrentCompany(company)
				toast.success(`Successfully selected ${company.name}`)
			}
		} catch (error) {
			toast.error('Failed to save company selection')
			console.error(error)
		} finally {
			setIsSaving(false)
		}
	}

	const handleSelectCompany = companyId => {
		const company = companies.find(c => c.id === companyId)
		if (company) {
			setCurrentCompany(company)
			toast.success(`Selected ${company.name}`)
		}
	}

	if (isLoading) {
		return (
			<MainLayout>
				<div className='space-y-6'>
					<div>
						<Skeleton className='h-8 w-64 mb-2' />
						<Skeleton className='h-4 w-96' />
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
						<Card>
							<CardContent className='p-6'>
								<Skeleton className='h-6 w-48 mb-4' />
								<Skeleton className='h-10 w-full mb-4' />
								<Skeleton className='h-10 w-32' />
							</CardContent>
						</Card>

						<Card>
							<CardContent className='p-6'>
								<Skeleton className='h-6 w-48 mb-4' />
								<div className='space-y-4'>
									<Skeleton className='h-16 w-full' />
									<Skeleton className='h-16 w-full' />
								</div>
							</CardContent>
						</Card>
					</div>

					<div className='space-y-4'>
						{Array.from({ length: 3 }).map((_, i) => (
							<Card key={i}>
								<CardContent className='p-6'>
									<Skeleton className='h-6 w-48 mb-4' />
									<Skeleton className='h-4 w-full mb-4' />
									<div className='flex justify-between items-center'>
										<div className='flex space-x-4'>
											<Skeleton className='h-4 w-20' />
											<Skeleton className='h-4 w-20' />
											<Skeleton className='h-4 w-20' />
										</div>
										<Skeleton className='h-10 w-32' />
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
				<div>
					<h1 className='text-2xl font-bold text-gray-900'>
						Select Your Company
					</h1>
					<p className='text-gray-600'>
						Choose the company context you want to work with. This
						will determine the interviews and candidates you'll
						manage.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					{/* Company Selection */}
					<Card>
						<CardHeader>
							<CardTitle>Company Selection</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div>
								<label className='text-sm font-medium text-gray-700 mb-2 block'>
									Select Company
								</label>
								<Select
									value={selectedCompany}
									onValueChange={setSelectedCompany}
								>
									<SelectTrigger>
										<SelectValue placeholder='Choose a company' />
									</SelectTrigger>
									<SelectContent>
										{companies.map(company => (
											<SelectItem
												key={company.id}
												value={company.id}
											>
												{company.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<Button
								onClick={handleSaveSelection}
								disabled={isSaving || !selectedCompany}
								className='bg-blue-600 hover:bg-blue-700'
							>
								{isSaving ? 'Saving...' : 'Save Selection'}
							</Button>

							<div className='bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3'>
								<Info className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
								<div className='text-sm text-blue-800'>
									<p className='font-medium mb-1'>
										Company Selection
									</p>
									<p>
										Your selected company determines which
										interviews and candidates you can access
										and manage.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Your Company Status */}
					<Card>
						<CardHeader>
							<CardTitle>Your Company Status</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='flex items-center justify-center py-8'>
								<Building2 className='h-16 w-16 text-gray-300' />
							</div>

							<div className='bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3'>
								<CheckCircle className='h-5 w-5 text-green-600' />
								<div>
									<p className='font-medium text-green-800'>
										Approval Status:
									</p>
									<p className='text-sm text-green-700'>
										Your account is approved and active
									</p>
								</div>
							</div>

							<div className='space-y-3'>
								<h4 className='font-medium text-gray-900'>
									Need Help?
								</h4>
								<p className='text-sm text-gray-600'>
									If you're new or need assistance with
									joining a company, visit our guidance page
									for detailed instructions.
								</p>
								<Button variant='outline' className='w-full'>
									<HelpCircle className='mr-2 h-4 w-4' />
									View Account Guidance
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Available Companies */}
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h2 className='text-lg font-semibold'>
							Available Companies
						</h2>
						<Button
							variant='outline'
							size='sm'
							onClick={loadCompanies}
						>
							<RefreshCw className='mr-2 h-4 w-4' />
							Refresh List
						</Button>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						{companies.map(company => (
							<Card
								key={company.id}
								className='hover:shadow-md transition-shadow'
							>
								<CardContent className='p-6'>
									<div className='flex items-center justify-between mb-4'>
										<h3 className='text-lg font-semibold'>
											{company.name}
										</h3>
										<Badge className='bg-green-100 text-green-800'>
											{company.status === 'active'
												? 'Active'
												: 'Inactive'}
										</Badge>
									</div>

									<p className='text-sm text-gray-600 mb-4'>
										{company.description}
									</p>

									<div className='grid grid-cols-3 gap-4 mb-4'>
										<div className='text-center'>
											<div className='text-lg font-bold text-blue-600'>
												{company.interviewsCount}
											</div>
											<p className='text-xs text-gray-600'>
												Interviews
											</p>
										</div>
										<div className='text-center'>
											<div className='text-lg font-bold text-green-600'>
												{company.recruitersCount}
											</div>
											<p className='text-xs text-gray-600'>
												Recruiters
											</p>
										</div>
										<div className='text-center'>
											<div className='text-lg font-bold text-purple-600'>
												{company.candidatesCount}
											</div>
											<p className='text-xs text-gray-600'>
												Candidates
											</p>
										</div>
									</div>

									<Button
										onClick={() =>
											handleSelectCompany(company.id)
										}
										className='w-full bg-blue-600 hover:bg-blue-700'
										disabled={
											currentCompany?.id === company.id
										}
									>
										{currentCompany?.id === company.id
											? 'Selected'
											: 'Select Company'}
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
