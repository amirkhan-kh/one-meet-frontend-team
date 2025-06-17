import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/one_meet_logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("signupRole");
    if (!savedRole) {
      navigate("/select-role");
    } else {
      setRole(savedRole);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/host/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      navigate("/verify-prompt");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google"; // YOUR BACKEND GOOGLE ROUTE
  };

  const handleLinkedInLogin = () => {
    window.location.href = "http://localhost:8000/auth/linkedin"; // Optional
  };

  return (
    <div className="page-background">
      <div className="form-container">
        <img src={logo} alt="OneMeet Logo" className="logo bigger-logo" />
        <h1 className="hero-subtitle fixed-width-subtitle match-bg-subtitle">
          Create your OneMeet account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="input-field"
          />

          <label>Create your password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="input-field"
          />

          <button type="submit" className="ai-cta active-cta w-full">Sign Up</button>

          <div className="flex flex-col gap-3 pt-4">
            <button type="button" className="btn-google" onClick={handleGoogleLogin}>
              <FcGoogle size={20} className="mr-2" /> Continue with Google
            </button>
            <button type="button" className="btn-linkedin" onClick={handleLinkedInLogin}>
              <FaLinkedin size={20} className="mr-2 text-[#0A66C2]" /> Continue with LinkedIn
            </button>
          </div>

          <div className="pt-4 text-center">
            <a href="/login" className="animated-link">
              Already have an account? Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
