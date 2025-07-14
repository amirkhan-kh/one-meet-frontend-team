import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function NotificationsCompany() {
  const company = useSelector((state) => state.companyByOwner.data);
  const comId = company?.id;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    notifyMarketing: false,
    notifyLowBalance: false,
    notifyRecruiterRequest: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.onemeet.app/company/get-by-id/${comId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = res.data?.data;
      setForm({
        notifyMarketing: data.notifyMarketing,
        notifyLowBalance: data.notifyLowBalance,
        notifyRecruiterRequest: data.notifyRecruiterRequest,
      });
    };
    fetchData();
  }, [comId]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await axios.patch(
      `https://api.onemeet.app/company/upgrade/${comId}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setLoading(false);
  };

  return (
    <div className="shadow p-4 bg-white rounded-md w-full md:w-[70%]">
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold text-[20px]">Notification Settings</h3>

        <div className="flex items-start justify-between border p-4 rounded-md">
          <div>
            <h4 className="font-medium">Low Interview Balance</h4>
            <p className="text-sm text-muted-foreground">
              Notify me when interview credits fall below 3
            </p>
          </div>
          <input
            type="checkbox"
            name="notifyLowBalance"
            checked={form.notifyLowBalance}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </div>

        <div className="flex items-start justify-between border p-4 rounded-md">
          <div>
            <h4 className="font-medium">Recruiter Join Requests</h4>
            <p className="text-sm text-muted-foreground">
              Notify me when a recruiter requests to join the company
            </p>
          </div>
          <input
            type="checkbox"
            name="notifyRecruiterRequest"
            checked={form.notifyRecruiterRequest}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </div>

        <div className="flex items-start justify-between border p-4 rounded-md">
          <div>
            <h4 className="font-medium">Marketing Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Send me product updates and occasional marketing emails
            </p>
          </div>
          <input
            type="checkbox"
            name="notifyMarketing"
            checked={form.notifyMarketing}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="text-white bg-gradient-to-r from-[#3b45d6] to-[#611bd6] hover:text-[#d0cccc]"
          >
            {loading ? "Saving..." : "Save Change"}
          </Button>
        </div>
      </div>
    </div>
  );
}
