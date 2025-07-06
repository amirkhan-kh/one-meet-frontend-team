import { useState, useEffect } from "react";
import axios from "axios";

export const useUserMe = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios
        .get("https://api.onemeet.app/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("Token topilmadi");
    }
  }, []);

  return { user, loading, error };
};
