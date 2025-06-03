import { FaGoogle, FaLinkedin } from "react-icons/fa";
import Logo from "../../../assets/one_meet_logo.png";
import "../../../styles/forms.css";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const isFilled = form.email.trim() !== "" && form.password.trim() !== "";

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-background">
      <div className="form-container compact-form no-shadow">
        <img src={Logo} alt="OneMeet Logo" className="logo bigger-logo" />
        <h1 className="hero-subtitle fixed-width-subtitle match-bg-subtitle">Welcome to OneMeet</h1>

        <form>
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field slim-input"
            value={form.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field slim-input"
            value={form.password}
            onChange={handleInputChange}
            required
          />

          <button
            type="submit"
            className={`ai-cta slim-cta ${isFilled ? "active-cta" : "inactive-cta"}`}
          >
            Login
          </button>
        </form>

        <div className="separator">or</div>

        <div className="oauth-buttons vertical-oauth">
          <button className="btn-google">
            <FaGoogle size={20} style={{ color: "#4285F4", marginRight: "8px" }} />
            Continue with Google
          </button>
          <button className="btn-linkedin">
            <FaLinkedin size={20} style={{ color: "#0A66C2", marginRight: "8px" }} />
            Continue with LinkedIn
          </button>
        </div>

        <div className="form-links">
          <AnimatedLink href="/signup" label="Create an account" />
          <AnimatedLink href="/forgot-password" label="Forgot password?" />
        </div>
      </div>
    </div>
  );
}

function AnimatedLink({ href, label }) {
  return (
    <a href={href} className="animated-link">{label}</a>
  );
}
