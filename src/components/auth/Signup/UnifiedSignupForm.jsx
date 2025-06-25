import { useState } from "react";
import axios from "axios";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircleIcon } from "lucide-react";

export default function UnifiedSignupForm({ role, goBack }) {
  const [form, setForm] = useState({
    email: "",
    passwordHash: "",
    authRole: role,
  });

  const navigate = useNavigate();

  // For company role, we need to check if they have business email
  const [hasBusinessEmail, setHasBusinessEmail] = useState(
    role === "COMPANY" ? null : true
  );

  const isFilled = form.email && form.passwordHash;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Show success message after registration
  if (success) {
    return (
      <div className="compact-form no-shadow w-full max-w-md space-y-4 text-center">
        <div className="success-message">
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            Registration Successful!
          </h3>
          <p className="text-sm text-gray-700 mb-4">{successMessage}</p>
          <div className="text-xs text-gray-500">
            Your account details have been saved. Please check your email to
            verify your account.
          </div>
        </div>

        <button
          onClick={() => {
            navigate("/login");
          }}
          className="ai-cta slim-cta active-cta w-full"
        >
          Continue to Login
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);

    // API call for all roles
    axios
      .post("https://api.onemeet.app/auth/register", form)
      .then((res) => {
        console.log("Registration successful:", res);

        // Save user data to localStorage
        if (res.data && res.data.data) {
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          // localStorage.setItem("userToken", res.data.data.id) // or token if provided
        }

        // Set success state and message
        setSuccess(true);
        setSuccessMessage(res.data.message || "Registration successful!");
      })
      .catch((err) => {
        alert(err.response?.data?.reason || "Noma'lum xatolik.");
      });
  };

  const handleGoogleAuth = () => {
    console.log(`Google auth for ${role}`);
    // Implement Google OAuth
  };

  const handleLinkedInAuth = () => {
    console.log(`LinkedIn auth for ${role}`);
    // Implement LinkedIn OAuth
  };

  // Company role - ask about business email first
  if (role === "COMPANY" && hasBusinessEmail === null) {
    return (
      <div className="compact-form no-shadow w-full max-w-md space-y-4">
        <p className="text-sm text-gray-700 text-left">
          Do you have a business email address?
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setHasBusinessEmail(true)}
            className="ai-cta slim-cta active-cta w-full"
          >
            Yes
          </button>
          <button
            onClick={() => setHasBusinessEmail(false)}
            className="ai-cta slim-cta inactive-cta w-full"
          >
            No
          </button>
        </div>

        <div className="form-links">
          <AnimatedLink href="#" onClick={goBack} label="← Back" />
        </div>
      </div>
    );
  }

  // Company without business email - LinkedIn only
  if (role === "COMPANY" && hasBusinessEmail === false) {
    return (
      <div className="compact-form no-shadow w-full max-w-md space-y-4">
        <div className="linkedin-note-text">
          Since you don't have a business email, you must sign up using
          LinkedIn. This helps us verify legitimate companies.
        </div>

        <button
          className="btn-linkedin"
          type="button"
          onClick={handleLinkedInAuth}
        >
          <FaLinkedin
            size={20}
            style={{ color: "#0A66C2", marginRight: "8px" }}
          />
          Continue with LinkedIn
        </button>

        <div className="form-links">
          <AnimatedLink
            href="#"
            onClick={() => setHasBusinessEmail(null)}
            label="← Back"
          />
        </div>
      </div>
    );
  }

  // Main signup form for all roles
  return (
    <form
      onSubmit={handleSubmit}
      className="compact-form no-shadow w-full max-w-md space-y-3"
    >
      <label htmlFor="email" className="form-label">
        {role === "COMPANY" ? "Business Email" : "Email"}
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="input-field slim-input"
        value={form.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="passwordHash"
        className="input-field slim-input"
        value={form.passwordHash}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className={`ai-cta slim-cta ${
          isFilled ? "active-cta" : "inactive-cta"
        }`}
      >
        Sign Up
        {/* as {role === "CANDIDATE" ? "Candidate" : role === "RECRUITER" ? "Recruiter" : "Company"} */}
      </button>

      {/* OAuth buttons for Candidate and Recruiter */}
      {(role === "CANDIDATE" || role === "RECRUITER") && (
        <>
          <div className="separator">or</div>

          <div className="oauth-buttons vertical-oauth">
            <button
              className="btn-google"
              type="button"
              onClick={handleGoogleAuth}
            >
              <FaGoogle
                size={20}
                style={{ color: "#4285F4", marginRight: "8px" }}
              />
              Continue with Google
            </button>
            <button
              className="btn-linkedin"
              type="button"
              onClick={handleLinkedInAuth}
            >
              <FaLinkedin
                size={20}
                style={{ color: "#0A66C2", marginRight: "8px" }}
              />
              Continue with LinkedIn
            </button>
          </div>
        </>
      )}

      <div className="form-links">
        <AnimatedLink href="#" onClick={goBack} label="← Back" />
      </div>
    </form>
  );
}

function AnimatedLink({ href, label, onClick }) {
  return (
    <a href={href} onClick={onClick} className="animated-link">
      {label}
    </a>
  );
}
