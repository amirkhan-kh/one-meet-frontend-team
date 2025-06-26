import { MainLayout } from '@/components/dashboards/RecruiterDashboard/recruiter-components/main-layout'
import { InterviewManagement } from './interview-components/interview-management'

export const InterviewsRec = () => {
	// These would typically come from authentication context or route params
	const recruiterId = 'current-recruiter-id'
	const companyId = 'current-company-id'

	return (
		<MainLayout>
			<InterviewManagement
				recruiterId={recruiterId}
				companyId={companyId}
			/>
		</MainLayout>
	)
}
