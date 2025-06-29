import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, FileText, Plus, Users } from 'lucide-react'

export function QuickActions() {
	const actions = [
		{ icon: Plus, label: 'Schedule Interview' },
		{ icon: Calendar, label: 'View Calendar' },
		{ icon: FileText, label: 'Generate Report' },
		{ icon: Users, label: 'Manage Candidates' },
	]

	return (
		<Card className='border border-gray-200'>
			<CardHeader>
				<CardTitle className='text-lg'>Quick Actions</CardTitle>
			</CardHeader>
			<CardContent className='space-y-3'>
				{actions.map((action, index) => (
					<Button
						key={index}
						variant='outline'
						className='w-full justify-start gap-3 h-10 bg-transparent'
					>
						<action.icon className='w-4 h-4' />
						{action.label}
					</Button>
				))}
			</CardContent>
		</Card>
	)
}
