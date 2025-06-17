import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/candidate/profile"); // yoki "/dashboard"
    } else {
      alert("Token not found. Please try again.");
      navigate("/");
    }
  }, [navigate]);

  return <p className="text-center mt-10">Processing login...</p>;
}
