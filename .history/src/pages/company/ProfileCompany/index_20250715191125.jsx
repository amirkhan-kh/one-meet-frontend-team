import { Input } from "@/components/ui/input";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "@/store/company-service/profile-get";
import { fetchCompanyByOwnerId } from "@/store/company-service/get-profile-by-id";
import { CiGlobe } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";
import AccountSettingsCompany from "@/components/dashboards/CompanyDashboard/components/AccountSettingsCompany";
import NotificationsCompany from "@/components/dashboards/CompanyDashboard/components/NotificationsCompany";

export const ProfileCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const dispatch = useDispatch();
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("information");

  const { data, loading, error } = useSelector(
    (state) => state.companyProfileGet
  );
  const company = useSelector((state) => state.companyByOwner.data);

  useEffect(() => {
    if (data && data.id) dispatch(fetchCompanyByOwnerId(data.id));
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    const fetchLogo = async () => {
      if (data?.profilePicture) {
        try {
          const token = localStorage.getItem("accessToken");
          const res = await fetch(
            `https://api.onemeet.app/media/business/files/${data.profilePicture}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.ok) {
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            setLogo(blobUrl);
          }
        } catch (err) {
          console.error("Logo fetch error:", err);
        }
      }
    };
    fetchLogo();
  }, [data?.profilePicture]);

  useEffect(() => {
    if (company?.name) setCompanyName(company.name);
    if (company?.website) setWebsite(company.website);
  }, [company]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setLogo(imageURL);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(
        `https://api.onemeet.app/company/update/${company.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: companyName, website: website }),
        }
      );

      if (res.ok) {
        dispatch(fetchCompanyByOwnerId(data.id));
      } else {
        console.error("Update failed", res.status);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="px-4 lg:px-40 py-8">
      <h3 className="text-2xl font-semibold mb-4">
        Company Profile Management
      </h3>
      <p className="text-[15px] mb-8">
        Update your company information to keep your profile accurate and
        up-to-date.
      </p>

      <div className="flex flex-col md:flex-row gap-2 sm:gap-5 w-full">
        <div className="flex flex-col sm:flex-row md:flex-col w-full md:w-[30%] gap-2 sm:gap-6 md:gap-0">
          <div className="shadow px-3 sm:px-6 py-3 sm:py-8 bg-white rounded-md mb-4 sm:mb-10 w-full">
            <h3 className="font-semibold text-[18px]">Current Profile</h3>
            <div className="shadow rounded-sm w-full h-40">
              {loading || error ? (
                <Skeleton className="w-full h-full rounded-md" />
              ) : logo ? (
                <img
                  src={logo}
                  alt="logo"
                  className="object-contain h-full rounded-md w-full"
                />
              ) : (
                <div className="text-center text-sm text-gray-400 pt-12">
                  No Logo
                </div>
              )}
            </div>
            <ul>
              <li className="text-[12px] text-gray-600 my-1 font-light">
                Company Name
              </li>
              <span>
                {loading || error ? (
                  <Skeleton className="w-1/2 h-4" />
                ) : (
                  company?.name || "Not provided"
                )}
              </span>

              <li className="text-[12px] text-gray-600 ">LinkedIn </li>
              <span className="flex items-center gap-2">
                {loading || error ? (
                  <Skeleton className="w-3/4 h-4" />
                ) : company?.linkedin ? (
                  <a
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-[10px] sm:text-[12px] w-full"
                  >
                    {company.linkedin}
                  </a>
                ) : (
                  "Not provided"
                )}
                <CiGlobe className="text-blue-600" />
              </span>

              <li className="text-[12px] text-gray-600 my-2">Website</li>
              <span className="flex items-center gap-2">
                {loading || error ? (
                  <Skeleton className="w-3/4 h-4" />
                ) : company?.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-[10px] sm:text-[12px]"
                  >
                    {company.website}
                  </a>
                ) : (
                  "Not provided"
                )}
                <CiGlobe className="text-blue-600" />
              </span>
            </ul>
          </div>

          <div className="shadow px-3 sm:px-6 py-2 sm:py-6 bg-white rounded-md mb-4 sm:mb-10 w-full">
            <button
              onClick={() => setActiveTab("information")}
              className={`w-full text-center py-2 rounded ${
                activeTab === "information"
                  ? "text-[#2a43d4] hover:bg-gray-100 border border-solid border-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Company Information
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full text-center py-2 rounded my-2 ${
                activeTab === "account"
                  ? "text-[#2a43d4] hover:bg-gray-100 border border-solid border-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Account Settings
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full text-center py-2 rounded ${
                activeTab === "notifications"
                  ? "text-[#2a43d4] hover:bg-gray-100 border border-solid border-gray-300"
                  : "hover:bg-gray-100"
              }`}
            >
              Notifications
            </button>
          </div>
        </div>

        {activeTab === "information" && (
          <div className="shadow p-4 bg-white rounded-md w-full md:w-[70%]">
            <div className="flex flex-col justify-between gap-10">
              <h3 className="font-semibold text-[20px]">Company Information</h3>
              <label className="font-semibold text-[14] flex flex-col gap-3">
                Company Name
                {loading || error ? (
                  <Skeleton className="w-full h-10 rounded-md" />
                ) : (
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="bg-gray-100 border border-gray-200 text-gray-500"
                  />
                )}
              </label>
              <label className="font-semibold text-[14] flex flex-col gap-3">
                Last Name
                {loading || error ? (
                  <Skeleton className="w-full h-10 rounded-md" />
                ) : (
                  <Input
                    value={data?.lastName}
                    // onChange={(e) => setWebsite(e.target.value)}
                    className="bg-gray-100 border border-gray-200 text-gray-500"
                  />
                )}
              </label>
              <label className="font-semibold text-[14] flex flex-col gap-3">
                First Name
                {loading || error ? (
                  <Skeleton className="w-full h-10 rounded-md" />
                ) : (
                  <Input
                    value={data?.firstName}
                    // onChange={(e) => setWebsite(e.target.value)}
                    className="bg-gray-100 border border-gray-200 text-gray-500"
                  />
                )}
              </label>
              <label className="font-semibold text-[14] flex flex-col gap-3">
                Website
                {loading || error ? (
                  <Skeleton className="w-full h-10 rounded-md" />
                ) : (
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="bg-gray-100 border border-gray-200 text-gray-500"
                  />
                )}
              </label>

              <div className="w-full border rounded-lg border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo
                </label>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-white border border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                    {loading || error ? (
                      <Skeleton className="w-full h-full" />
                    ) : logo ? (
                      <img
                        src={logo}
                        alt="Company Logo"
                        className="object-contain h-full"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Logo</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Current Logo</p>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="mt-4 flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-100"
                  >
                    <Upload size={16} /> Upload New Logo
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span></span>
                <Button
                  onClick={handleSave}
                  className="text-white bg-gradient-to-r from-[#3b45d6] to-[#611bd6] hover:text-[#d0cccc]"
                  variant="outline"
                >
                  Save Change
                </Button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "account" && <AccountSettingsCompany />}
        {activeTab === "notifications" && <NotificationsCompany />}
      </div>
    </div>
  );
};
