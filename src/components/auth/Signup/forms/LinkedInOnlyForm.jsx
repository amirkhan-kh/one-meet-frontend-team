import { FaLinkedin } from "react-icons/fa";

export default function LinkedInOnlyForm({ goBack }) {
  return (
    <div className="compact-form no-shadow w-full max-w-md space-y-4">
      <div className="linkedin-note-text">
        Since you don’t have a business email, you must sign up using LinkedIn.
        This helps us verify legitimate companies.
      </div>

      <button className="btn-linkedin" type="button" onClick={() => console.log("LinkedIn")}>
        <FaLinkedin size={20} style={{ color: "#0A66C2", marginRight: "8px" }} />
        Continue with LinkedIn
      </button>

      <div className="form-links">
        <AnimatedLink href="#" onClick={goBack} label="← Back" />
      </div>
    </div>
  );
}

function AnimatedLink({ href, label, onClick }) {
  return (
    <a href={href} onClick={onClick} className="animated-link">{label}</a>
  );
}
