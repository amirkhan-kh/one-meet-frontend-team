export const navigationAdminDashboard = [
    { navName: "Dashboard", pathName: "/admin-dashboard"},
    { navName: "Data Management", pathName: "data-management"},
    { navName: "Plans & Payments", pathName: "plans-payments"},
    { navName: "System Logs", pathName: "system-logs"},
    { navName: "Account Control", pathName: "account-control"},
];
export const navigationCompanyDashboard = [
    { navName: "Dashboard", pathName: "/company"},
    { navName: "Plans", pathName: "plans"},
    { navName: "Profile", pathName: "profile-company"},
];
export const navigationRecruiterDashboard = [
    { navName: "Dashboard", pathName: "/recruiter"},
    { navName: "Interview", pathName: "interviews-rec"},
    { navName: "Candidate", pathName: "candidate-rec"},
    { navName: "Company", pathName: "company-rec"},
    { navName: "Profile", pathName: "profile-recruiter"},
];
export const navigationCandidateDashboard = [
    { navName: "Home", pathName: "/"},
    { navName: "Dashboard", pathName: "/candidate"},
    { navName: "Join Interview", pathName: "join-interview"},
    { navName: "Feedback", pathName: "feedback"},
    // { navName: "Home", pathName: "/"},
    { navName: "Dashboard", pathName: "/candidate-dashboard"},
    // { navName: "Join Interview", pathName: "join-interview"},
    // { navName: "Feedback", pathName: "feedback"},
    { navName: "Help", pathName: "/help"},
    { navName: "Profile", pathName: "profile-candidate"},
]

import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { HiTv } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { HiChartBar } from "react-icons/hi";
import { MdAdminPanelSettings } from "react-icons/md";

export const asideNavigation = [
    { navName: "Companies", pathName: "/admin-dashboard", icon: HiBuildingOffice2},
    { navName: "Recruiters", pathName: "recruiters-table", icon: HiUsers},
    { navName: "Candidates", pathName: "candidate-table", icon: FaUsers},
    { navName: "Interviews", pathName: "interviews-table", icon: HiTv},
    { navName: "Payments", pathName: "payments-table", icon: FaMoneyCheckDollar},
    { navName: "Reports", pathName: "reports-table", icon: HiChartBar},
    { navName: "Admins", pathName: "admins-table", icon: MdAdminPanelSettings},
];