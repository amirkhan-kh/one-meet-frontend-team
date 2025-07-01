import AccountSettings from "@/components/dashboards/CandidateDashboard/components/AccountSettings";
import Notifications from "@/components/dashboards/CandidateDashboard/components/Notifications";
import PersonalInfo from "@/components/dashboards/CandidateDashboard/components/PersonalInfo";
import { useUserMe } from "@/lib/hook/useUserMe";
import axios from "axios";
import { useEffect, useState } from "react";

export const ProfileCandidate = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profilePicture, setProfilePicture] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    timezone: "",
    profilePicture: "",
  });
  const [newPicture, setNewPicture] = useState(null);

  const token = localStorage.getItem("accessToken");
  const { user, loading, error } = useUserMe();

  const getUser = () => {
    if (user && user.profilePicture) {
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
  };

  
  const handleUploadPhoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", e.target.files[0]);

      axios
        .post(
          "https://api.onemeet.app/media/business/upload-avatar",
          formDataUpload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setNewPicture(res.data.data.id);
          console.log("Rasm yuklandi:", res.data.data.id);
          
          // getUser();
        })
        .catch((err) => {
          console.error("Rasm yuklashda xatolik:", err);
        });
    }
  };
  
  useEffect(() => {
    if (user) {
      getUser();
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        profilePicture: newPicture || "",
      });
    }
  }, [user, newPicture]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const userPut = () => {
    axios
      .put(`https://api.onemeet.app/user/update/${user.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getUser();
        console.log("Foydalanuvchi yangilandi", res.data);
      })
      .catch((err) => {
        console.error("Yangilashda xatolik:", err);
      });
  };

  return (
    <div className="container">
      <div className="mb-8">
        <p className="font-bold text-2xl mb-4">Your Profile</p>
        <p>Manage your personal information and account settings</p>
      </div>
      <div className="flex gap-8 flex-col md:flex-row">
        {/* Sidebar */}
        <div>
          <div className="border border-solid border-gray-200 rounded-lg p-10 text-center mb-5">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center overflow-hidden text-2xl font-bold text-white">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile Picture"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-black text-4xl">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </span>
              )}
            </div>
            <label
              htmlFor="upload-photo"
              className="cursor-pointer bg-gray-50 px-4 py-2 rounded mt-3 border border-solid border-gray-300 hover:bg-gray-100 inline-block"
            >
              Upload Photo
            </label>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              onChange={handleUploadPhoto}
              className="hidden"
            />
          </div>
          <div className="w-full p-4 border border-solid border-gray-200 rounded-lg">
            <button
              onClick={() => setActiveTab("personal")}
              className={`w-full text-center px-4 py-2 rounded ${
                activeTab === "personal"
                  ? "text-[#2a43d4] hover:bg-gray-100 border border-solid border-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full text-center px-4 py-2 rounded my-2 ${
                activeTab === "account"
                  ? "text-[#2a43d4] hover:bg-gray-100 border border-solid border-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Account Settings
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full text-center px-4 py-2 rounded ${
                activeTab === "notifications"
                  ? "text-[#2a43d4] hover:bg-gray-100 border border-solid border-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Notifications
            </button>
          </div>
        </div>
      <div className="w-full border border-solid border-gray-200 rounded-lg p-5">
        {activeTab === "personal" && (
          <PersonalInfo
            formData={formData}
            handleInputChange={handleInputChange}
            userPut={userPut}
          />
        )}
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "notifications" && <Notifications />}
      </div>
      </div>

    </div>
  );
};
