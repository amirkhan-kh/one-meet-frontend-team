"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CompanyCreateRecruiterModal({ companyId, companyName, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);
  const [timezone, setTimezone] = useState("UTC");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://api.onemeet.app/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data?.data;
        if (data?.timezone) setTimezone(data.timezone);
        if (data?.profilePicture) setProfilePicture(data.profilePicture);
      } catch (err) {
        console.warn("⚠️ Failed to fetch user profile for recruiter creation:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");

      console.log("🚀 Submitting form with values:", form);
      console.log("🌐 Timezone:", timezone);
      console.log("🖼️ Profile Picture ID:", profilePicture);

      // Create auth user
      console.log("📤 Sending request to create auth user...");
      const authRes = await axios.post(
        `https://api.onemeet.app/auth/createByCompany`,
        {
          email: form.email,
          firstname: form.firstName,
          companyName: companyName || "",
          position: form.position,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("✅ Auth user created:", authRes.data);
      const authUserId = authRes.data.data.id;

      // Create user profile
      console.log("📤 Sending request to create user profile...");
      const userRes = await axios.post(
        `https://api.onemeet.app/user/create`,
        {
          authUserId,
          firstName: form.firstName,
          lastName: form.lastName,
          timezone,
          profilePicture,
          profileCompleted: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("✅ User profile created:", userRes.data);
      const userProfileId = userRes.data.data.id;

// Create recruiter
const recruiterPayload = {
  userProfileId,
  companyId,
  position: form.position,
  approvedByRecruiter: false,
};

console.log("📦 Recruiter payload to be sent:", recruiterPayload);

const recruiterRes = await axios.post(
  `https://api.onemeet.app/recruiter/create`,
  recruiterPayload,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);

console.log("✅ Recruiter created successfully:", recruiterRes.data);


      toast.success("✅ Recruiter successfully created and notified.");
      setForm({ email: "", firstName: "", lastName: "", position: "" });
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error("❌ Recruiter creation failed:", err);
      const res = err.response?.data;
      if (res?.reason) {
        toast.error(res.reason);
      } else if (Array.isArray(res?.errors)) {
        res.errors.forEach((msg) => toast.error(msg));
      } else if (res?.message) {
        toast.error(res.message);
      } else {
        toast.error("Recruiter creation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="bg-[#0823d4bc] hover:bg-[#0823d4bc] text-white px-3 py-1 rounded-sm mb">
        <Button>
          Add Recruiter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className={`mb-3`}>Invite New Recruiter</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" name="position" value={form.position} onChange={handleChange} required />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Inviting..." : "Invite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
