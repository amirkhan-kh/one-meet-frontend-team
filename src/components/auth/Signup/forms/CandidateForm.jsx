import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CandidateProfileForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    timezone: "",
    profilePicture: null,
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // yoki contextdan olingan bo'lishi mumkin
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("timezone", form.timezone);
    if (form.profilePicture) {
      formData.append("profilePicture", form.profilePicture);
    }
    if (form.bio) {
      formData.append("bio", form.bio);
    }

    const res = await fetch("/candidate/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      navigate("/dashboard"); // yoki boshqa tegishli route
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <h2 className="form-title">Complete Your Profile</h2>

      <label>First name</label>
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        required
        className="input-field"
      />

      <label>Last name</label>
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        required
        className="input-field"
      />

      <label>Your timezone</label>
      <input
        type="text"
        name="timezone"
        value={form.timezone}
        onChange={handleChange}
        required
        className="input-field"
        placeholder="e.g. UTC+5, GMT+3, etc."
      />

      <label>Upload profile picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="input-field"
      />

      <label>Bio (optional)</label>
      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        className="input-field"
        placeholder="Write a short bio about yourself"
      />

      <button type="submit" className="ai-cta active-cta w-full">Submit</button>
    </form>
  );
}
