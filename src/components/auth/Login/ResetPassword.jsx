import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../../assets/one_meet_logo.png";
import "../../../styles/forms.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // URLdan tokenni olish
  const token = new URLSearchParams(location.search).get("token");

  const isFilled = password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Token topilmadi");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      password: password,
      uuid: token,
    };

    axios
      .post("https://api.onemeet.app/auth/confirm-password", payload)
      .then((response) => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        setError("Parolni tiklashda xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="page-background">
      <div className="form-container compact-form no-shadow">
        <div className="logo-container">
          <img src={Logo} alt="OneMeet Logo" className="logo bigger-logo" />
        </div>
        <h1 className="hero-subtitle fixed-width-subtitle match-bg-subtitle">
          Welcome to OneMeet
        </h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field slim-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            className={`ai-cta slim-cta ${
              isFilled ? "active-cta" : "inactive-cta"
            }`}
            disabled={!isFilled || loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
