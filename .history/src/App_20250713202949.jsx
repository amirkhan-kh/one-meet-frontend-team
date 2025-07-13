import { Route, Routes } from 'react-router-dom'

import ForgotPassword from './components/auth/Login/ForgotPassword'
import LoginPage from './components/auth/Login/LoginPage'
import Verify from './components/auth/Signup/authVerify/Verify'
import SignupPage from './components/auth/Signup/SignupPage'
import LandingPage from './pages/LandingPage'

import CandidateCompleteProfile from './components/auth/Signup/complete/CandidateCompleteProfile'
import CompanyCompleteProfile from './components/auth/Signup/complete/CompanyCompleteProfile'
import RecruiterCompleteProfile from './components/auth/Signup/complete/RecruiterCompleteProfile'

import { Feedback, JoinInterviews, ProfileCandidate } from './pages/candidate'
import { Plans } from './pages/company/Plans'
import { ProfileCompany } from './pages/company/ProfileCompany'
import { InterviewsRec, ProfilerecruiterRec } from './pages/recruiter'

import { AdminDashboard } from './components/dashboards/AdminDashboard/AdminD'
import { CandidateDashboard } from './components/dashboards/CandidateDashboard/CandidateD'
import { CompanyDashboard } from './components/dashboards/CompanyDashboard/CompanyD'
import { RecruiterDashboard } from './components/dashboards/RecruiterDashboard/RecruiterD'

import {
	AdminsTable,
	CandidateTable,
	InterviewsTable,
	PaymentsTable,
	RecruiterTable,
	ReportsTable,
} from './pages/admin'
import { ComapaniesTable } from './pages/admin/companies-table'

import CandidateHome from './pages/candidate/Dashboard'
// import DashboardCompany from './pages/company/DashboardCompany'
import { RecruitersCompany } from './pages/company/RecrutersCompany'
import { UsageCompany } from './pages/company/UsageCompany'
import ContactSupport from './pages/contact-support/ContactSupport'
import UsageRec from './pages/recruiter/UsageRec'
import PreCheckPage from './pages/candidate/Dashboard/PreCheckPage'
import InterviewWrapper from './pages/candidate/Dashboard/InterviewWrapper'
import FinishPage from './pages/candidate/Dashboard/FinishPage'
import ResetPassword from './components/auth/Login/ResetPassword'

function App() {
	return (
		<Routes>
			{/* Public */}
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/signup' element={<SignupPage />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='/auth/verify' element={<Verify />} />
			<Route path='/contact-support' element={<ContactSupport />} />
			<Route path='/reset-password' element={<ResetPassword />} />

			{/* Complete profile routes */}
			<Route
				path='/complete-profile/candidate'
				element={<CandidateCompleteProfile />}
			/>
			<Route
				path='/complete-profile/recruiter'
				element={<RecruiterCompleteProfile />}
			/>
			<Route
				path='/complete-profile/company'
				element={<CompanyCompleteProfile />}
			/>

			{/* Candidate Dashboard */}
			<Route path='/candidate/interview/:id' element={<InterviewWrapper />}/>
			<Route path='/candidate' element={<CandidateDashboard />}>
				<Route index element={<CandidateHome />} />
				<Route path='precheck' element={<PreCheckPage />} />
				{/* <Route path="interview/:id" element={<InterviewWrapper />} /> */}
				<Route path="finish" element={<FinishPage />} />
				{/* <Route path='feedback' element={<Feedback />} /> */}
				{/* <Route path='join-interview' element={<JoinInterviews />} /> */}
				<Route
					path='profile-candidate'
					element={<ProfileCandidate />}
				/>
			</Route>

			{/* Admin Dashboard */}
			<Route path='/admin-dashboard' element={<AdminDashboard />}>
				<Route index element={<ComapaniesTable />} />
				<Route path='candidate-table' element={<CandidateTable />} />
				<Route path='interviews-table' element={<InterviewsTable />} />
				<Route path='payments-table' element={<PaymentsTable />} />
				<Route path='recruiters-table' element={<RecruiterTable />} />
				<Route path='reports-table' element={<ReportsTable />} />
				<Route path='admins-table' element={<AdminsTable />} />
			</Route>

			{/* Company Dashboard */}
			<Route path='/company' element={<CompanyDashboard />}>
				{/* <Route index element={<DashboardCompany />} /> */}
				<Route index element={<RecruitersCompany />}/>
				<Route path='finance' element={<Plans />} />
				<Route path='usage' element={<UsageCompany />} />
				<Route path='profile-company' element={<ProfileCompany />} />
			</Route>

			{/* Recruiter Dashboard */}
			<Route path='/recruiter' element={<RecruiterDashboard />}>
				<Route index element={<InterviewsRec />} />
				<Route path='interviews-rec' element={<InterviewsRec />} />
				<Route path='usage' element={<UsageRec />} />
				<Route	path='profile-recruiter'
					element={<ProfilerecruiterRec />}
				/>
			</Route>
		</Routes>
	)
}

export default App
