"use client";
import { useState } from "react";
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

export default function CompanyCreateRecruiterModal({ companyId, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const companyData = JSON.parse(localStorage.getItem("companyProfile")) || {};
      const timezone = companyData.timezone || "UTC";
      const profilePicture = companyData.profilePicture || "";

      const authRes = await axios.post(
        `https://api.onemeet.app/auth/createByCompany`,
        {
          email: form.email,
          firstname: form.firstName,
          companyName: "",
          position: form.position,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const authUserId = authRes.data.data.id;

      const userRes = await axios.post(
        `https://api.onemeet.app/auth/create
`,
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
      const userProfileId = userRes.data.data.id;

      await axios.post(
        `/recruiter/create`,
        {
          userProfileId,
          companyId,
          position: form.position,
          approvedByCompany: true,
          approvedByRecruiter: false,
          newSubmissionNotificationsEnabled: true,
          interviewDeadlineAlertsEnabled: true,
          marketingNotificationsEnabled: true,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Recruiter successfully created and notified.");
      setOpen(false);
      setForm({ email: "", firstName: "", lastName: "", position: "" });
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Recruiter creation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#0823d4bc] text-white px-3 py-1 rounded-sm">
          Add Recruiter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Recruiter</DialogTitle>
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
              {loading ? "Creating..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
