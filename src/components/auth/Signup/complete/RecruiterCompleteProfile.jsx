import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../styles/forms.css";
import Logo from "../../../../assets/one_meet_logo.png";

export default function RecruiterCompleteProfile() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    timezone: "",
    profilePicture: null,
    companyId: "",
    position: "",
  });
  const [timezones, setTimezones] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://worldtimeapi.org/api/timezone")
      .then((res) => setTimezones(res.data))
      .catch(() => setTimezones([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setForm({ ...form, profilePicture: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      setLoading(true);
      setError("");
      setMessage("");

      // TODO: Replace this with upload to MediaService later
      const profilePicUrl = "https://placeholder.com/profile.jpg";

      // Step 1: Create recruiter user profile
      const profileRes = await axios.post(
        "https://api.onemeet.app/recruiter/profile",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          timezone: form.timezone,
          profilePicture: profilePicUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userProfileId = profileRes.data.data.id;

      // Step 2: Submit recruiter-specific details
      await axios.post(
        "https://api.onemeet.app/recruiter/details",
        {
          userProfileId: userProfileId,
          companyId: form.companyId,
          position: form.position,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Recruiter profile completed.");
      navigate("/recruiter");
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
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

        <h1 className="hero-subtitle fixed-width-subtitle match-bg-subtitle">
          Complete Your Recruiter Profile
        </h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="input-field slim-input"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="input-field slim-input"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="timezone" className="form-label">Your Timezone</label>
          <select
            id="timezone"
            name="timezone"
            className="input-field slim-input"
            value={form.timezone}
            onChange={handleChange}
            required
          >
            <option value="">Select your timezone</option>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>

          <label htmlFor="profilePicture" className="form-label">Upload Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            className="input-field slim-input"
            onChange={handleChange}
            required
          />

          <label htmlFor="companyId" className="form-label">Company ID (from search)</label>
          <input
            type="text"
            id="companyId"
            name="companyId"
            className="input-field slim-input"
            placeholder="Company ID"
            value={form.companyId}
            onChange={handleChange}
            required
          />

          <label htmlFor="position" className="form-label">Your Position</label>
          <input
            type="text"
            id="position"
            name="position"
            className="input-field slim-input"
            placeholder="Your position"
            value={form.position}
            onChange={handleChange}
            required
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
