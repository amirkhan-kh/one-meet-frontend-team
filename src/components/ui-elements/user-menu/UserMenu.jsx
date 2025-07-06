import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router";
import { useUserMe } from "@/lib/hook/useUserMe";
import { useUser } from "@/lib/hook/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function UserMenu() {
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const { user, loading, error } = useUserMe();
  const userData = useUser();

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
    if (user && user.profilePicture) {
      const token = localStorage.getItem("accessToken");
      axios
        .get(
          `https://api.onemeet.app/media/business/files/${user.profilePicture}`,
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
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Xatolik: {error.message || error}</p>;

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center cursor-pointer space-x-2">
            <div>
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="User profile"
                  className="w-10 h-10 rounded-lg object-cover"
                />
              ) : (
                <div className="bg-black text-white w-10 h-10 rounded-lg flex items-center justify-center">
                  {user
                    ? user.firstName.charAt(0) + user.lastName.charAt(0)
                    : ""}
                </div>
              )}
            </div>
            <div className="md:block hidden text-start">
              <p className="text-sm font-semibold">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </p>
              <p className="text-xs">{userData?.user?.email}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
