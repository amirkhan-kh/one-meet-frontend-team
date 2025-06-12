import { Route, Routes } from 'react-router-dom'

import ForgotPassword from './components/auth/Login/ForgotPassword'
import LoginPage from './components/auth/Login/LoginPage'
import SignupPage from './components/auth/Signup/SignupPage'
import { AdminD } from './components/Dashboards/AdminDashboard/AdminD'
import { CandidateD } from './components/Dashboards/CandidateDashboard/CandidateD'
import { CompanyD } from './components/Dashboards/CompanyDashboard/CompanyD'
import DashboardPage from './components/dashboards/RecruiterDashboard/components/dashboard'
import { RecruiterD } from './components/Dashboards/RecruiterDashboard/RecruiterD'
import { Control, DataManagement, Payments, SystemLogs } from './pages/admin'
import { Feedback, JoinInterviews, ProfileCandidate } from './pages/candidate'
import CompanyHomeD from './pages/company/DashboardC'
import { Plans } from './pages/company/Plans'
import { ProfileCompany } from './pages/company/ProfileCompany'
import LandingPage from './pages/LandingPage'
import {
	CompanyRec,
	InterviewsRec,
	ProfilerecruiterRec,
} from './pages/recruiter'
import CandidateRec from './pages/recruiter/CandidatesRec'
function App() {
	return (
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='/signup' element={<SignupPage />} />

			{/* Dashboards */}

			{/* Candidate */}
			<Route path='/candidate-dashboard' element={<CandidateD />}>
				<Route path='feedback' element={<Feedback />} />
				<Route path='join-interview' element={<JoinInterviews />} />
				<Route
					path='profile-candidate'
					element={<ProfileCandidate />}
				/>
			</Route>

			{/* Admin */}
			<Route path='/admin-dashboard' element={<AdminD />}>
				<Route path='data-management' element={<DataManagement />} />
				<Route path='plans-payments' element={<Payments />} />
				<Route path='system-logs' element={<SystemLogs />} />
				<Route path='account-control' element={<Control />} />
			</Route>

			{/* Company */}
			<Route path='/company-dashboard' element={<CompanyD />}>
				<Route index element={<CompanyHomeD />} />{' '}
				{/* default/index route */}
				<Route path='plans' element={<Plans />} />
				<Route path='profile-company' element={<ProfileCompany />} />
			</Route>

			{/* Recruiter */}
			<Route path='/recruiter-dashboard' element={<RecruiterD />}>
				<Route index element={<DashboardPage />} />
				<Route path='candidate-rec' element={<CandidateRec />} />
				<Route path='company-rec' element={<CompanyRec />} />
				<Route path='interviews-rec' element={<InterviewsRec />} />
				<Route
					path='profile-recruiter'
					element={<ProfilerecruiterRec />}
				/>
			</Route>
		</Routes>
	)
}

export default App
