import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/forms.css";
import Logo from "../../../assets/one_meet_logo.png";

export default function CandidateCompleteProfile() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    timezone: "",
    profilePicture: "",
    bio: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      setLoading(true);
      setError("");
      setMessage("");

      // Step 1: Create base user profile
      const profileRes = await axios.post(
        "https://api.onemeet.app/candidate/profile",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          timezone: form.timezone,
          profilePicture: form.profilePicture,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userProfileId = profileRes.data.data.id;

      // Step 2: Submit candidate-specific details
      await axios.post(
        "https://api.onemeet.app/candidate/details",
        {
          user_profileId: userProfileId,
          resume_url: "", // Optional
          career_goals: form.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Profile completed successfully.");
      navigate("/candidate");
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-background">
      <div className="form-container compact-form no-shadow">
        <div className="logo-container">
          <img src={Logo} alt="OneMeet Logo" className="logo bigger-logo" />
        </div>
        <h1 className="hero-subtitle fixed-width-subtitle match-bg-subtitle">Complete Your Profile</h1>

        <form onSubmit={handleSubmit}>
          <label className="form-label">First Name</label>
          <input
            name="firstName"
            className="input-field slim-input"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <label className="form-label">Last Name</label>
          <input
            name="lastName"
            className="input-field slim-input"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <label className="form-label">Your Timezone</label>
          <input
            name="timezone"
            className="input-field slim-input"
            placeholder="Your timezone (e.g., Europe/Warsaw)"
            value={form.timezone}
            onChange={handleChange}
            required
          />

          <label className="form-label">Upload Profile Picture (URL)</label>
          <input
            name="profilePicture"
            className="input-field slim-input"
            placeholder="Image URL"
            value={form.profilePicture}
            onChange={handleChange}
            required
          />

          <label className="form-label">Bio (optional)</label>
          <input
            name="bio"
            className="input-field slim-input"
            placeholder="Bio (optional)"
            value={form.bio}
            onChange={handleChange}
          />

          {error && <p className="form-error">{error}</p>}
          {message && <p className="form-success">{message}</p>}

          <button
            type="submit"
            className={`ai-cta slim-cta ${loading ? "inactive-cta" : "active-cta"}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
