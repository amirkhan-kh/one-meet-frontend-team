import { Route, Routes } from 'react-router-dom'

import ForgotPassword from './components/auth/Login/ForgotPassword'
import LoginPage from './components/auth/Login/LoginPage'
import SignupPage from './components/auth/Signup/SignupPage'
import { AdminDashboard } from './components/dashboards/AdminDashboard/AdminD'
import { CandidateDashboard } from './components/dashboards/CandidateDashboard/CandidateD'
import { CompanyDashboard } from './components/dashboards/CompanyDashboard/CompanyD'
import { RecruiterDashboard } from './components/dashboards/RecruiterDashboard/RecruiterD'
import { Feedback, JoinInterviews, ProfileCandidate } from './pages/candidate'
import { Plans } from './pages/company/Plans'
import { ProfileCompany } from './pages/company/ProfileCompany'
import LandingPage from './pages/LandingPage'
import { ProfilerecruiterRec } from './pages/recruiter'
import { InterviewsRec } from './pages/recruiter/InterviewsRec'
function App() {
	return (
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='/signup' element={<SignupPage />} />

			{/* Dashboards */}

			{/* Candidate */}
			<Route path='/candidate-dashboard' element={<CandidateDashboard />}>
				<Route path='feedback' element={<Feedback />} />
				<Route path='join-interview' element={<JoinInterviews />} />
				<Route
					path='profile-candidate'
					element={<ProfileCandidate />}
				/>
			</Route>

			{/* Admin */}
			<Route path='/admin-dashboard' element={<AdminDashboard />}></Route>

			{/* Company */}
			<Route path='/company-dashboard' element={<CompanyDashboard />}>
				<Route path='plans' element={<Plans />} />
				<Route path='profile-company' element={<ProfileCompany />} />
			</Route>

			{/* Recruiter */}
			<Route path='/recruiter-dashboard' element={<RecruiterDashboard />}>
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
