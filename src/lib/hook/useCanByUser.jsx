import { useState, useEffect } from "react";
import axios from "axios";
import { useUserMe } from "./useUserMe";

export const useCanById = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUserMe();
  const candidateId = user?.user?.id;
  

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (candidateId && token) { 
      axios
        .get(`https://api.onemeet.app/candidate/by-user/${candidateId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserId(res.data.data);
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
  }, [candidateId]);

  return { userId, loading, error };
};
