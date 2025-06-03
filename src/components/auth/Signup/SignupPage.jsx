import { useState } from "react";
import RoleFormRouter from "./RoleFormRouter";
import logo from "../../../assets/one_meet_logo.png";
import { User, Briefcase, Building2 } from "lucide-react";

export default function SignupPage() {
  const [role, setRole] = useState(null);

  return (
    <div className="page-background">
      <div className="form-container">
        {/* Top Logo & Welcome */}
        <img src={logo} alt="OneMeet Logo" className="logo bigger-logo" />
        <h1 className="hero-subtitle fixed-width-subtitle match-bg-subtitle">
          Welcome to OneMeet
        </h1>

        {!role ? (
          <>
            {/* Role Buttons */}
            <div className="oauth-buttons vertical-oauth">
              <SignupButton
                title="Sign up as Candidate"
                icon={<User size={20} style={{ color: "#4285F4", marginRight: "8px" }} />}
                onClick={() => setRole("candidate")}
              />
              <SignupButton
                title="Sign up as Recruiter"
                icon={<Briefcase size={20} style={{ color: "#22c55e", marginRight: "8px" }} />}
                onClick={() => setRole("recruiter")}
              />
              <SignupButton
                title="Sign up as Company"
                icon={<Building2 size={20} style={{ color: "#7c3aed", marginRight: "8px" }} />}
                onClick={() => setRole("company")}
              />
            </div>
          </>
        ) : (
          <RoleFormRouter role={role} goBack={() => setRole(null)} />
        )}
      </div>
    </div>
  );
}

function SignupButton({ title, icon, onClick }) {
  return (
    <button className="btn-google" onClick={onClick}>
      {icon}
      {title}
    </button>
  );
}
