import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, CheckCircle, Users } from 'lucide-react'

const Quickactions = () => {
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle className='text-lg font-semibold'>
						Quick Actions
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<Button
							className='h-16 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-blue-50 transition-colors'
							variant='outline'
						>
							<Calendar className='h-6 w-6 text-blue-600' />
							<span className='text-sm font-medium'>
								Schedule Interview
							</span>
						</Button>
						<Button
							className='h-16 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-green-50 transition-colors'
							variant='outline'
						>
							<Users className='h-6 w-6 text-green-600' />
							<span className='text-sm font-medium'>
								Add Candidate
							</span>
						</Button>
						<Button
							className='h-16 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-purple-50 transition-colors'
							variant='outline'
						>
							<CheckCircle className='h-6 w-6 text-purple-600' />
							<span className='text-sm font-medium'>
								Review Feedback
							</span>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default Quickactions
