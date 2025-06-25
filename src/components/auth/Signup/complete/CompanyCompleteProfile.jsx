import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../styles/forms.css";
import Logo from "../../../../assets/one_meet_logo.png";

export default function CompanyCompleteProfile() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    timezone: "",
    logoFile: null,
    name: "",
    linkedin: "",
    website: "",
  });
  const [timezones, setTimezones] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
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
    if (name === "logoFile") {
      setForm({ ...form, logoFile: files[0] });
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

      // TODO: Upload file to MediaService later
      const logoUrl = "https://placeholder.com/logo.jpg";

      // Step 1: Create user profile
      const profileRes = await axios.post(
        "https://api.onemeet.app/company/profile",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          timezone: form.timezone,
          profilePicture: logoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userProfileId = profileRes.data.data.id;

      // Step 2: Submit company details
      await axios.post(
        "https://api.onemeet.app/company/details",
        {
          ownerUserId: userProfileId,
          name: form.name,
          website: form.website,
          linkedin: form.linkedin,
          logoUrl: logoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Company profile completed.");
      navigate("/company");
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
          Complete Your Company Profile
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

          <label htmlFor="logoFile" className="form-label">Upload Company Logo</label>
          <input
            type="file"
            id="logoFile"
            name="logoFile"
            className="input-field slim-input"
            onChange={handleChange}
            required
          />

          <label htmlFor="name" className="form-label">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="input-field slim-input"
            placeholder="Company name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="linkedin" className="form-label">LinkedIn Page</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            className="input-field slim-input"
            placeholder="LinkedIn page"
            value={form.linkedin}
            onChange={handleChange}
            required
          />

          <label htmlFor="website" className="form-label">Website (optional)</label>
          <input
            type="text"
            id="website"
            name="website"
            className="input-field slim-input"
            placeholder="Website (optional)"
            value={form.website}
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
