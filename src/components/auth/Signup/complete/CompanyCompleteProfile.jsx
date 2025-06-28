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

  const [timezones, setTimezones] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("https://api.onemeet.app/user/time-zones", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          const grouped = res.data.data.reduce((acc, tz) => {
            const parts = tz.split(" - ");
            const region = parts[1]?.split("/")?.[0] || "Other";
            if (!acc[region]) acc[region] = [];
            acc[region].push(tz);
            return acc;
          }, {});
          setTimezones(grouped);
        } else {
          setTimezones({});
        }
      })
      .catch(() => setTimezones({}));
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

      if (
        !form.logoFile ||
        !["image/jpeg", "image/jpg", "image/png"].includes(form.logoFile.type)
      ) {
        setError("Only JPEG and PNG images are allowed.");
        setLoading(false);
        return;
      }

      // Step 1: Upload logo to media service
      const formData = new FormData();
      formData.append("file", form.logoFile);

      const mediaUpload = await axios.post(
        "https://api.onemeet.app/media/business/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const mediaId = mediaUpload.data?.data?.id;
      if (!mediaId) throw new Error("Logo upload failed");

      // Step 2: Create user profile
      const userRes = await axios.post(
        "https://api.onemeet.app/user/create",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          timezone: form.timezone,
          profilePicture: mediaId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userProfileId = userRes.data.data.id;

      // Step 3: Create company
      await axios.post(
        "https://api.onemeet.app/company/create",
        {
          ownerUserId: userProfileId,
          name: form.name,
          website: form.website,
          linkedin: form.linkedin,
          logoUrl: mediaId,
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
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="timezone" className="form-label">Timezone</label>
          <select
            id="timezone"
            name="timezone"
            className="input-field slim-input"
            value={form.timezone}
            onChange={handleChange}
            required
          >
            <option value="">Select your timezone</option>
            {Object.keys(timezones).map((region) => (
              <optgroup key={region} label={region}>
                {timezones[region].map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <label htmlFor="logoFile" className="form-label">Company Logo</label>
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
