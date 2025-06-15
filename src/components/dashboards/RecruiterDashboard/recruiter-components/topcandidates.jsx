import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

const TopCandidates = () => {
	const [candidates, setCandidates] = useState([])

	useEffect(() => {
		const fetchCandidates = async () => {
			const candidatesData = await api.candidate.getAll()
			setCandidates(candidatesData)
		}
		fetchCandidates()
	}, [])

	const topCandidates = candidates.slice(0, 5).map(candidate => ({
		...candidate,
		rating: Math.floor(Math.random() * 2) + 4, // Mock rating 4-5
	}))
	return (
		<div className='w-full'>
			<Card className='col-span-2 lg:w-[800px]'>
				<CardHeader>
					<CardTitle className='text-lg font-semibold'>
						Top Candidates
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='space-y-3'>
						{topCandidates.map(candidate => (
							<div
								key={candidate.id}
								className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'
							>
								<div className='flex items-center space-x-3'>
									<div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold'>
										{candidate.name
											.split(' ')
											.map(n => n[0])
											.join('')}
									</div>
									<div>
										<p className='text-sm font-medium text-gray-900'>
											{candidate.name}
										</p>
										<p className='text-sm text-gray-500'>
											{candidate.position || 'Developer'}
										</p>
									</div>
								</div>
								<div className='flex items-center space-x-2'>
									<div className='flex'>
										{Array.from({ length: 5 }, (_, i) => (
											<Star
												key={i}
												className={`w-4 h-4 ${
													i < candidate.rating
														? 'text-yellow-400 fill-current'
														: 'text-gray-300'
												}`}
											/>
										))}
									</div>
									<Badge
										variant='outline'
										className={`text-xs cursor-pointer hover:bg-gray-200 ${
											candidate.status === 'selected'
												? 'bg-blue-100 text-blue-800 border-blue-200'
												: candidate.status === 'active'
												? 'bg-green-100 text-green-800 border-green-200'
												: candidate.status === 'pending'
												? 'bg-yellow-100 text-yellow-800 border-yellow-200'
												: 'bg-red-100 text-red-800 border-red-200'
										}`}
										title={`Status: ${candidate.status}`}
									>
										{candidate.status}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default TopCandidates
