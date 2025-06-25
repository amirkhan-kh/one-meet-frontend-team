import React, { useEffect, useState } from "react";
import "./verify.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      axios
        .get(`https://api.onemeet.app/auth/verify`, { token })
        .then((res) => {
          navigate("/home");
        })
        .catch((err) => {
          setError(err.response?.data?.error || "Verification failed");
        });
    } else {
      setError("Token not found in URL");
    }
  }, [location, navigate]);

  if (error) {
    return (
      <div className="spinner">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="spinner">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>Loading...</div>
    </div>
  );
}
