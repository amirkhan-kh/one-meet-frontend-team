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
    bio: "",
  });

  const [initialData, setInitialData] = useState({
    firstName: "",
    lastName: "",
    profilePicture: "",
    bio: "",
  });

  const [newPicture, setNewPicture] = useState(null);
  const token = localStorage.getItem("accessToken");
  const { user } = useUserMe();
  const [candidateId, setCandidateId] = useState(null);

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

  const getCandidateByUser = () => {
    if (user && user.id) {
      axios
        .get(`https://api.onemeet.app/candidate/by-user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const bioData = res.data.data.career_goals || "";
          setFormData((prev) => ({ ...prev, bio: bioData }));
          setInitialData((prev) => ({ ...prev, bio: bioData }));
          const bioId = res.data.data.id;
          setCandidateId(bioId);
        })
        .catch((err) => {
          console.error("Bio olishda xatolik:", err);
        });
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
      getCandidateByUser();

      const userData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        profilePicture: newPicture || "",
        bio: "", // Bio getCandidateByUser dan keladi
      };

      setFormData(userData);
      setInitialData(userData);
    }
  }, [user, newPicture]);

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
        const uploadedId = res.data.data.id;

        // Formdagi profilePicture ni yangilash
        const updatedFormData = { ...formData, profilePicture: uploadedId };
        setFormData(updatedFormData);
        setNewPicture(uploadedId);

        // User ma'lumotlarini yangilash
        axios
          .put(`https://api.onemeet.app/user/update/${user.id}`, updatedFormData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            getUser(); // yangi rasmni ko‘rsatish uchun
          })
          .catch((err) => {
            console.error("User rasm yangilashda xatolik:", err);
          });
      })
      .catch((err) => {
        console.error("Rasm yuklashda xatolik:", err);
      });
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isChangedUser =
    formData.firstName !== initialData.firstName ||
    formData.lastName !== initialData.lastName;

  const isChangedBio = formData.bio !== initialData.bio;

  const handleSave = () => {
    if (isChangedUser && isChangedBio) {
      userPut();
      bioPut();
    } else if (isChangedUser) {
      userPut();
    } else if (isChangedBio) {
      bioPut();
    }
  };

  const userPut = () => {
    axios
      .put(`https://api.onemeet.app/user/update/${user.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        
        getUser();
        // window.location.reload();
      })
      .catch((err) => {
        console.error("User yangilashda xatolik:", err);
      });
  };

  const bioPut = () => {
    axios
      .put(
        `https://api.onemeet.app/candidate/updateCandidate/${candidateId}`,
        { career_goals: formData.bio, user_profileId: user.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        log
        getCandidateByUser();
      })
      .catch((err) => {
        console.error("Bio yangilashda xatolik:", err);
      });
  };

  const resetForm = () => {
    setFormData(initialData);
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
              handleSave={handleSave}
              isChangedUser={isChangedUser}
              isChangedBio={isChangedBio}
              resetForm={resetForm}
            />
          )}
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "notifications" && <Notifications />}
        </div>
      </div>
    </div>
  );
};
