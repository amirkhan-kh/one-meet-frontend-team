import { useState } from "react";
import LinkedInOnlyForm from "./LinkedInOnlyForm";

export default function CompanyForm({ goBack }) {
  const [hasBusinessEmail, setHasBusinessEmail] = useState(null);

  const handleChoice = (choice) => {
    setHasBusinessEmail(choice);
  };

  if (hasBusinessEmail === null) {
    return (
      <div className="compact-form no-shadow w-full max-w-md space-y-4">
        <p className="text-sm text-gray-700 text-left">Do you have a business email address?</p>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => handleChoice(true)}
            className="ai-cta slim-cta active-cta w-full"
          >
            Yes
          </button>
          <button
            onClick={() => handleChoice(false)}
            className="ai-cta slim-cta inactive-cta w-full"
          >
            No
          </button>
        </div>

        <div className="form-links">
          <AnimatedLink href="#" onClick={goBack} label="← Back" />
        </div>
      </div>
    );
  }

  return hasBusinessEmail ? (
    <BusinessForm goBack={goBack} />
  ) : (
    <LinkedInOnlyForm goBack={goBack} />
  );
}

function BusinessForm({ goBack }) {
  const [form, setForm] = useState({
    // firstName: "",
    // lastName: "",
    email: "",
    password: "",
    // companyName: "",
    // companyCountry: "",
  });

  const isFilled =
    form.email && form.password;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting business:", form);
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
      /> */}

      <label htmlFor="email" className="form-label">Business Email</label>
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
        name="password"
        className="input-field slim-input"
        value={form.password}
        onChange={handleChange}
        required
      />

      {/* <label htmlFor="companyName" className="form-label">Company Name</label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        className="input-field slim-input"
        value={form.companyName}
        onChange={handleChange}
        required
      />

      <label htmlFor="companyCountry" className="form-label">Country</label>
      <input
        type="text"
        id="companyCountry"
        name="companyCountry"
        className="input-field slim-input"
        value={form.companyCountry}
        onChange={handleChange}
        required
      /> */}

      <button
        type="submit"
        className={`ai-cta slim-cta ${isFilled ? "active-cta" : "inactive-cta"}`}
      >
        Sign Up
      </button>

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
