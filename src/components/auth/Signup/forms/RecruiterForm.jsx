import { useState } from "react";
import axios from "axios";

export default function RecruiterProfileForm({ goBack }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    timezone: "",
    profilePicture: null,
    company: "",
    position: "",
  });

  const isFilled =
    form.firstName && form.lastName && form.timezone && form.company && form.position;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("timezone", form.timezone);
    formData.append("company", form.company);
    formData.append("position", form.position);
    if (form.profilePicture) {
      formData.append("profilePicture", form.profilePicture);
    }

    try {
      const res = await axios.post("/recruiter/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message || "Profile submitted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <h2 className="form-title">Complete Recruiter Profile</h2>

      <label className="form-label" htmlFor="firstName">First name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        className="input-field"
        value={form.firstName}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="lastName">Last name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        className="input-field"
        value={form.lastName}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="timezone">Your timezone</label>
      <input
        type="text"
        id="timezone"
        name="timezone"
        className="input-field"
        value={form.timezone}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="profilePicture">Upload profile picture</label>
      <input
        type="file"
        id="profilePicture"
        accept="image/*"
        className="input-field"
        onChange={handleFileChange}
      />

      <label className="form-label" htmlFor="company">Search for your company</label>
      <input
        type="text"
        id="company"
        name="company"
        className="input-field"
        value={form.company}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="position">Your position</label>
      <input
        type="text"
        id="position"
        name="position"
        className="input-field"
        value={form.position}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className={`ai-cta w-full ${isFilled ? "active-cta" : "inactive-cta"}`}
      >
        Submit
      </button>

      <div className="form-links text-center">
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
