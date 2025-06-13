import { MainLayout } from '@/components/dashboards/RecruiterDashboard/components/main-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const ProfileSkeleton = () => {
	return (
		<div>
			<MainLayout>
				<div className='space-y-6'>
					<div>
						<Skeleton className='h-8 w-48 mb-2' />
						<Skeleton className='h-4 w-96' />
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						<div className='lg:col-span-2 space-y-6'>
							<Card>
								<CardContent className='p-6'>
									<div className='flex items-center space-x-4 mb-6'>
										<Skeleton className='h-20 w-20 rounded-full' />
										<div>
											<Skeleton className='h-6 w-32 mb-2' />
											<Skeleton className='h-4 w-24' />
										</div>
									</div>
									<div className='space-y-4'>
										<Skeleton className='h-10 w-full' />
										<Skeleton className='h-10 w-full' />
									</div>
								</CardContent>
							</Card>
						</div>
						<div>
							<Card>
								<CardContent className='p-6'>
									<Skeleton className='h-6 w-32 mb-4' />
									<div className='space-y-3'>
										{Array.from({ length: 3 }).map(
											(_, i) => (
												<Skeleton
													key={i}
													className='h-12 w-full'
												/>
											)
										)}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</MainLayout>
		</div>
	)
}

export default ProfileSkeleton
