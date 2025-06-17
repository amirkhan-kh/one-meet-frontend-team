import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    timezone: "",
    companyLogo: null,
    companyName: "",
    linkedIn: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, companyLogo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("timezone", form.timezone);
    formData.append("companyName", form.companyName);
    formData.append("linkedIn", form.linkedIn);
    if (form.website) {
      formData.append("website", form.website);
    }
    if (form.companyLogo) {
      formData.append("companyLogo", form.companyLogo);
    }

    const res = await fetch("/company/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      navigate("/dashboard"); // yoki sizda mavjud redirect sahifasi
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <h2 className="form-title">Complete Company Profile</h2>

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
        placeholder="e.g. UTC+5"
      />

      <label>Upload company logo</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="input-field"
      />

      <label>Company name</label>
      <input
        type="text"
        name="companyName"
        value={form.companyName}
        onChange={handleChange}
        required
        className="input-field"
      />

      <label>LinkedIn page</label>
      <input
        type="url"
        name="linkedIn"
        value={form.linkedIn}
        onChange={handleChange}
        required
        className="input-field"
        placeholder="https://linkedin.com/company/..."
      />

      <label>Website (optional)</label>
      <input
        type="url"
        name="website"
        value={form.website}
        onChange={handleChange}
        className="input-field"
        placeholder="https://yourcompany.com"
      />

      <button type="submit" className="ai-cta active-cta w-full">Submit</button>
    </form>
  );
}
