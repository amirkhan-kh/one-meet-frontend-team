import CandidateForm from "./forms/CandidateForm";
import RecruiterForm from "./forms/RecruiterForm";
import CompanyForm from "./forms/CompanyForm";

export default function RoleFormRouter({ role, goBack }) {
  switch (role) {
    case "candidate":
      return <CandidateForm goBack={goBack} />;
    case "recruiter":
      return <RecruiterForm goBack={goBack} />;
    case "company":
      return <CompanyForm goBack={goBack} />;
    default:
      return null;
  }
}
