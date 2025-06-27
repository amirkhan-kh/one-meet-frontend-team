// UnifiedSignupForm.jsx
import { useState } from "react"
import axios from "axios"
import { FaGoogle, FaLinkedin } from "react-icons/fa"

export default function UnifiedSignupForm({ role, goBack }) {
  const [form, setForm] = useState({
    email: "",
    passwordHash: "",
    authRole: role,
  })

  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const isFilled = form.email && form.passwordHash

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("https://api.onemeet.app/auth/register", form)
      .then((res) => {
        setSuccess(true)
        setSuccessMessage(res.data.message || "Registration successful!")
        localStorage.setItem("userData", JSON.stringify(res.data.data))
      })
      .catch((err) => {
        alert(err.response?.data?.reason || "Registration failed.")
      })
  }

  if (success) {
    return (
      <div className="compact-form no-shadow w-full max-w-md space-y-4 text-center">
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          Registration Successful!
        </h3>
        <p className="text-sm text-gray-700">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="compact-form no-shadow w-full max-w-md space-y-3">
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="input-field slim-input"
        value={form.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password" className="form-label">
        Password
      </label>
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
        Sign Up as {role.toLowerCase()}
      </button>

      <div className="form-links">
        <AnimatedLink href="#" onClick={goBack} label="← Back" />
      </div>
    </form>
  )
}

function AnimatedLink({ href, label, onClick }) {
  return (
    <a href={href} onClick={onClick} className="animated-link">
      {label}
    </a>
  )
}
