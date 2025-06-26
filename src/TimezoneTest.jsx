import React, { useEffect, useState } from "react";

export default function TimezoneTest() {
  const [result, setResult] = useState("Loading...");

  useEffect(() => {
    fetch("https://api.onemeet.app/user/time-zones")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setResult(JSON.stringify(data, null, 2));
      })
      .catch((err) => {
        console.error("Error fetching timezones:", err);
        setResult("Failed to fetch: " + err.message);
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Timezone API Test (no token)</h2>
      <pre style={{ background: "#eee", padding: "1rem" }}>{result}</pre>
    </div>
  );
}
