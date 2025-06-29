import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PersonalInfo() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    axios
      .get("https://api.onemeet.app/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        const userData = res.data.data;
        setUser({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={user.firstName + " " + user.lastName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter your first name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          // value={user.email}
          // onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          // value={user.bio}
          // onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter your bio"
          rows="4"
        />
      </div>

      <div className="flex justify-start gap-4">
        <button className="px-4 py-2 bg-[#2a43d4] text-white rounded-md">
          Save Changes
        </button>
        <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 border rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
}
