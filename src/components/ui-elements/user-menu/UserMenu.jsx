import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router";

export default function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .post(
        "https://api.onemeet.app/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios
        .get("https://api.onemeet.app/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const userData = res.data.data;
          setUser(userData);
          if (userData.profilePicture) {
            axios
              .get(
                `https://api.onemeet.app/media/business/files/${userData.profilePicture}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                  responseType: "blob",
                }
              )
              .then((res) => {
                const imageUrl = URL.createObjectURL(res.data);
                setProfilePicture(imageUrl);
              })
              .catch((err) => {
                console.error("Rasmni olishda xatolik:", err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="relative">
      <div
        onClick={toggleMenu}
        className="flex items-center cursor-pointer space-x-2"
      >
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="User profile"
            className="w-10 h-10 rounded-lg object-cover"
          />
        ) : (
          <div className="bg-black text-white w-10 h-10 rounded-lg flex items-center justify-center">
            {user ? user.firstName.charAt(0) + user.lastName.charAt(0) : ""}
          </div>
        )}

        <div>
          <p className="text-sm font-semibold">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </p>
          <p className="text-xs">{user ? user.email : ""}</p>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg p-2 z-50">
          <ul>
            <li
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              <FaSignOutAlt className="mr-2" /> Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
