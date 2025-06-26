import { Route, Routes } from 'react-router-dom'


import LandingPage from "./pages/LandingPage";
import SignupPage from "./components/auth/Signup/SignupPage";
import LoginPage from "./components/auth/Login/LoginPage";
import ForgotPassword from "./components/auth/Login/ForgotPassword";
import { Plans } from "./pages/company/Plans";
import { ProfileCompany } from "./pages/company/ProfileCompany";
import { Control, DataManagement, Payments, SystemLogs } from "./pages/admin";
import { Feedback, JoinInterviews, ProfileCandidate } from "./pages/candidate";
import { CandidateRec, CompanyRec, InterviewsRec, ProfilerecruiterRec } from "./pages/recruiter";
import ForgotPassword from './components/auth/Login/ForgotPassword'
import LoginPage from './components/auth/Login/LoginPage'
import SignupPage from './components/auth/Signup/SignupPage'
import DashboardPage from './components/dashboards/RecruiterDashboard/components/dashboard'
import { Control, DataManagement, Payments, SystemLogs } from './pages/admin'
import { Feedback, JoinInterviews, ProfileCandidate } from './pages/candidate'
import CompanyHomeD from './pages/company/DashboardC'
import { Plans } from './pages/company/Plans'
import { ProfileCompany } from './pages/company/ProfileCompany'
import LandingPage from './pages/LandingPage'
import { CompanyRec, InterviewsRec,	ProfilerecruiterRec} from './pages/recruiter'
import CandidateRec from './pages/recruiter/CandidatesRec'
import { CompanyDashboard } from './components/dashboards/CompanyDashboard/CompanyD'
import { AdminDashboard } from './components/dashboards/AdminDashboard/AdminD'
import { CandidateDashboard } from './components/dashboards/CandidateDashboard/CandidateD'
import { RecruiterDashboard } from './components/dashboards/RecruiterDashboard/RecruiterD'
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword  />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Dashboards */}


      {/* Candidate */}
      <Route path="/candidate-dashboard" element={ <CandidateD/>} >
        <Route path="feedback" element={ <Feedback/>}/>
        <Route path="join-interview" element={ <JoinInterviews/> }/>
        <Route path="profile-candidate" element={ <ProfileCandidate/>}/>
      </Route>


      {/* Admin */}
      <Route path="/admin-dashboard" element={ <AdminD/>} >
        <Route path="data-management" element={ <DataManagement/>}/>
        <Route path="plans-payments" element={ <Payments/>}/>
        <Route path="system-logs" element={ <SystemLogs/>}/>
        <Route path="account-control" element={ <Control/>}/> 
      </Route>

     

      {/* Company */}
      <Route path="/company-dashboard" element={ <CompanyD/>} >
        <Route path="plans" element={ <Plans/> }/>
        <Route path="profile-company" element={ <ProfileCompany/> }/>
      </Route>

      {/* Recruiter */}
      <Route path="/recruiter-dashboard" element={ <RecruiterD/>} >
        <Route path="candidate-rec" element={ <CandidateRec/> } />
        <Route path="company-rec" element={ <CompanyRec/> }/>
        <Route path="interviews-rec" element={ <InterviewsRec/> }/>
        <Route path="profile-recruiter" element={ <ProfilerecruiterRec/> }/>
      </Route>
      
	</Routes>
  );
}

export default App
