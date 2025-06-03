import { useState } from "react";
import Logo from "../../../assets/one_meet_logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const isFilled = email.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Requesting password reset for:", email);
  };

  return (
    <div className="page-background">
      <div className="form-container compact-form no-shadow">
        <img src={Logo} alt="OneMeet Logo" className="logo bigger-logo" />
        <h1 className="hero-subtitle fixed-width-subtitle match-bg-subtitle">
          Welcome to OneMeet
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="email" className="form-label">Enter your email address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field slim-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`ai-cta slim-cta ${isFilled ? "active-cta" : "inactive-cta"}`}
          >
            Send Reset Link
          </button>
        </form>

        <div className="form-links">
          <AnimatedLink href="/login" label="← Back to Login" />
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
