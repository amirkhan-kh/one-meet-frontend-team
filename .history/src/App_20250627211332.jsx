import { Route, Routes } from 'react-router-dom';

import LandingPage from "./pages/LandingPage";
import SignupPage from "./components/auth/Signup/SignupPage";
import LoginPage from "./components/auth/Login/LoginPage";
import ForgotPassword from "./components/auth/Login/ForgotPassword";
import Verify from './components/auth/Signup/authVerify/Verify';

import CandidateCompleteProfile from './components/auth/Signup/complete/CandidateCompleteProfile';
import RecruiterCompleteProfile from './components/auth/Signup/complete/RecruiterCompleteProfile';
import CompanyCompleteProfile from './components/auth/Signup/complete/CompanyCompleteProfile';

import { Plans } from "./pages/company/Plans";
import { ProfileCompany } from "./pages/company/ProfileCompany";
import { Feedback, JoinInterviews, ProfileCandidate } from "./pages/candidate";
import { CandidateRec, CompanyRec, InterviewsRec, ProfilerecruiterRec } from "./pages/recruiter";

import { CompanyDashboard } from './components/dashboards/CompanyDashboard/CompanyD';
import { CandidateDashboard } from './components/dashboards/CandidateDashboard/CandidateD';
import { RecruiterDashboard } from './components/dashboards/RecruiterDashboard/RecruiterD';
import { AdminDashboard } from './components/dashboards/AdminDashboard/AdminD';

import DashboardCompany from './pages/company/DashboardCompany';
import { ComapaniesTable } from './pages/admin/companies-table';
import { AdminsTable, CandidateTable, InterviewsTable, PaymentsTable, RecruiterTable, ReportsTable } from './pages/admin';

import CandidateHome from './pages/candidate/Dashboard';

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/verify" element={<Verify />} />

      {/* Complete profile routes */}
      <Route path="/complete-profile/candidate" element={<CandidateCompleteProfile />} />
      <Route path="/complete-profile/recruiter" element={<RecruiterCompleteProfile />} />
      <Route path="/complete-profile/company" element={<CompanyCompleteProfile />} />


      {/* Candidate */}
      <Route path="/candidate" element={ <CandidateDashboard/>} >
        <Route index element={<CandidateHome />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="join-interview" element={<JoinInterviews />} />
        <Route path="profile-candidate" element={<ProfileCandidate />} />
      </Route>

      {/* Admin Dashboard */}
      <Route path="/admin-dashboard" element={<AdminDashboard />}>
        <Route index element={<ComapaniesTable />} />
        <Route path="candidate-table" element={<CandidateTable />} />
        <Route path="interviews-table" element={<InterviewsTable />} />
        <Route path="payments-table" element={<PaymentsTable />} />
        <Route path="recruiters-table" element={<RecruiterTable />} />
        <Route path="reports-table" element={<ReportsTable />} />
        <Route path="admins-table" element={<AdminsTable />} />
      </Route>

     

      {/* Company */}
      <Route path="/company" element={ <CompanyDashboard/>} >
	  	<Route index element={ <DashboardCompany/>}/>
        <Route path="plans" element={ <Plans/> }/>
        <Route path="usage" element=
        <Route path="profile-company" element={ <ProfileCompany/> }/>
      </Route>

      {/* Recruiter */}
      <Route path="/recruiter" element={ <RecruiterDashboard/>} >
        <Route path="candidate-rec" element={ <CandidateRec/> } />
        <Route path="company-rec" element={ <CompanyRec/> }/>
        <Route path="interviews-rec" element={ <InterviewsRec/> }/>
        <Route path="profile-recruiter" element={ <ProfilerecruiterRec/> }/>
        </Route>

      {/* Recruiter Dashboard */}
      {/* <Route path="/recruiter-dashboard" element={<RecruiterDashboard />}>
        <Route path="candidate-rec" element={<CandidateRec />} />
        <Route path="company-rec" element={<CompanyRec />} />
        <Route path="interviews-rec" element={<InterviewsRec />} />
        <Route path="profile-recruiter" element={<ProfilerecruiterRec />} />
      </Route> */}
    </Routes>
  );
}

export default App