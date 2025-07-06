import React, { useEffect,  useState } from "react";
import { PiCrownLight } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { GiSandsOfTime } from "react-icons/gi";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUserProfile } from "@/store/company-service/profile-get";
import { useDispatch, useSelector } from "react-redux";

const DashboardCompany = () => {
   const dispatch = useDispatch();
  const [logo, setLogo] = useState(null);
  const { data, loading, error } = useSelector((state) => state.companyProfileGet);

  useEffect(() => {
      dispatch(fetchUserProfile());
    }, [dispatch]);
  
    // 2. Fetch profile picture using token if available
    useEffect(() => {
      const fetchLogo = async () => {
        if (data?.profilePicture) {
          try {
            const token = localStorage.getItem("accessToken");
            const res = await fetch(
              `https://api.onemeet.app/media/business/files/${data.profilePicture}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.ok) {
              const blob = await res.blob();
              const blobUrl = URL.createObjectURL(blob);
              setLogo(blobUrl);
            } else {
              console.warn("Rasm yuklanmadi:", res.status);
            }
          } catch (err) {
            console.error("Rasm fetch xatoligi:", err);
          }
        }
      };
      fetchLogo();
    }, [data?.profilePicture]);
    if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error}</p>;
  return (
    <div className="px-3 py-5 sm:p-6">
      <div className="flex w-full  mb-14 justify-between">
        <div className="w-[60%]">
          <h3 className="text-[18px] sm:text-4xl font-semibold mb-14">
            Dashboard
          </h3>
          <p className="text-[17px] mb-3"><strong>Manage recruiter applications:</strong> You can easily accept, analyze, and manage applications submitted by recruiters, streamlining the recruitment process.</p>
          <p className="text-[17px] mb-3"><strong>Monitor company activity statistics:</strong> View key performance metrics such as employee productivity, project progress, and other essential statistics to track company performance.</p>
          <p className="text-[17px] mb-3"><strong>Track application statuses:</strong> Keep track of the progress of applications, check which stage they are at, and take necessary actions as needed.</p>
          <p className="text-[17px] mb-3"><strong>Advanced filtering options:</strong> Quickly sort and manage recruiter applications using filters tailored to your company’s specific needs and requirements.</p>
          <p className="text-[17px] mb-3"><strong>Data visualization:</strong> Company activity statistics are presented visually with graphs and charts, making it easier to interpret and make data-driven decisions.</p>
        </div>
        <div className="w-[30%] " >
          {logo ? (
                <img
                  src={logo}
                  alt={data?.firstName}
                  className="object-contain h-full rounded-md w-full drop-shadow"
                />
              ) : (
                <div className="text-center text-sm text-gray-400 pt-12">No Logo</div>
              )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-3">
        <div className="shadow-sm px-3 py-4 bg-white rounded-md w-full sm:w-[40%]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 mb-3 sm:mb-8">
            <FiUsers size={20} color="#0f1cb2" />
            <h4 className="text-[18px] font-semibold">Active Recruiters</h4>
          </div>
          <h4 className="text-3xl font-bold text-[#0f1cb2]">0</h4>
          <p className="text-[14px] font-light text-gray-500">
            Currently approved recruiters
          </p>
        </div>
        <div className="shadow-sm px-3 py-4 bg-white rounded-md w-full sm:w-[40%]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 mb-3 sm:mb-8">
            <GiSandsOfTime color="#e29d13" size={20} />
            <h4 className="text-[18px] font-semibold ">Pending Approvals</h4>
          </div>
          <h4 className="text-3xl font-bold text-[#e29d13]">0</h4>
          <p className="text-[14px] font-light text-gray-500">
            Awaiting your review
          </p>
        </div>
        <div className="shadow-sm px-3 py-4 bg-white rounded-md w-full sm:w-[40%]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 mb-4">
            <PiCrownLight size={20} color="#13e243" />
            <h4 className="text-[18px] font-semibold">Current Plan</h4>
          </div>
          <Progress value={1} className={`text-[#13e243]`} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full py-8">
        <h3 className="text-[18] sm:text-2xl font-semibold mb-4">
          Manage Recruiters
        </h3>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pending" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="denied">Denied</SelectItem>
          </SelectContent>
        </Select>
      </div>
    
    </div>
  );
};

export default DashboardCompany;
