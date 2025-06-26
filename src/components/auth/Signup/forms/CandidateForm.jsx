import axios from "axios";
import { useState } from "react";
import { FaGoogle, FaLinkedin } from "react-icons/fa";

export default function CandidateForm({ goBack }) {
  const [form, setForm] = useState({
    // firstName: "",
    // lastName: "",
    email: "",
    passwordHash: "",
    authRole: "CANDIDATE",
  });

  const isFilled = form.email && form.passwordHash;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitting candidate:", form);
    axios.post("https://api.onemeet.app/auth/register", form)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="compact-form no-shadow w-full max-w-md space-y-3">
      {/* <label htmlFor="firstName" className="form-label">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        className="input-field slim-input"
        value={form.firstName}
        onChange={handleChange}
        required
      /> */}

      {/* <label htmlFor="lastName" className="form-label">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        className="input-field slim-input"
        value={form.lastName}
        onChange={handleChange}
        required
      /> */}

      <label htmlFor="email" className="form-label">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="input-field slim-input"
        value={form.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password" className="form-label">Password</label>
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
        className={`ai-cta slim-cta ${isFilled ? "active-cta" : "inactive-cta"}`}
      >
        Sign Up
      </button>

      <div className="separator">or</div>

      <div className="oauth-buttons vertical-oauth">
        <button className="btn-google" type="button" onClick={() => console.log("Google")}>
          <FaGoogle size={20} style={{ color: "#4285F4", marginRight: "8px" }} />
          Continue with Google
        </button>
        <button className="btn-linkedin" type="button" onClick={() => console.log("LinkedIn")}>
          <FaLinkedin size={20} style={{ color: "#0A66C2", marginRight: "8px" }} />
          Continue with LinkedIn
        </button>
      </div>

      <div className="form-links">
        <AnimatedLink href="#" onClick={goBack} label="← Back" />
      </div>
    </form>
  );
}

function AnimatedLink({ href, label, onClick }) {
  return (
    <a href={href} onClick={onClick} className="animated-link">{label}</a>
  );
}
