import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { MainLayout } from './main-layout'

const DashboardLoading = () => {
	return (
		<div>
			<MainLayout>
				<div className='space-y-6'>
					<div>
						<Skeleton className='h-8 w-48 mb-2' />
						<Skeleton className='h-4 w-96' />
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{Array.from({ length: 4 }).map((_, i) => (
							<Card key={i}>
								<CardContent className='p-6'>
									<Skeleton className='h-4 w-16 mb-2' />
									<Skeleton className='h-8 w-12 mb-1' />
									<Skeleton className='h-3 w-20' />
								</CardContent>
							</Card>
						))}
					</div>

					<Skeleton className='h-96 w-full' />
				</div>
			</MainLayout>
		</div>
	)
}

export default DashboardLoading
