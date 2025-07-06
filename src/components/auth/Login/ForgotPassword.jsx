import { useState } from "react";
import axios from "axios";
import Logo from "../../../assets/one_meet_logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const isFilled = email.trim() !== "";
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    axios
      .post("https://api.onemeet.app/auth/send-uuid", { email })
      .then((res) => {
        setSuccess(true);
        setMessage(res.response.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.reason);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (success) {
    return (
      <div className="page-background">
        <div className="form-container">
          <div className="logo-container">
            <img src={Logo} alt="OneMeet Logo" className="logo bigger-logo" />
          </div>
          <h1 className="hero-subtitle fixed-width-subtitle match-bg-subtitle">
            Welcome to OneMeet
          </h1>
          <div className="compact-form no-shadow w-full max-w-md space-y-4 text-center">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              successfully
            </h3>
            <p className="text-sm text-gray-700">
              {setMessage} Check your email to change your password.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-background">
      <div className="form-container compact-form no-shadow">
        <img src={Logo} alt="OneMeet Logo" className="logo bigger-logo" />
        <h1 className="hero-subtitle fixed-width-subtitle match-bg-subtitle">
          Welcome to OneMeet
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="email" className="form-label">
            Enter your email address
          </label>
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
            className={`ai-cta slim-cta ${
              isFilled ? "active-cta" : "inactive-cta"
            }`}
            disabled={!isFilled || loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <div className="form-links">
          <AnimatedLink href="/login" label="← Back to Login" />
        </div>
      </div>
    </div>
  );
}

function AnimatedLink({ href, label }) {
  return (
    <a href={href} className="animated-link">
      {label}
    </a>
  );
}
