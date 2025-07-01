import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import logo from "../../../assets/one_meet_logo.png";
import { NavLink, useLocation } from "react-router";
import { navigationAdminDashboard, navigationCandidateDashboard, navigationCompanyDashboard, navigationRecruiterDashboard } from "@/db/navLinks";

export const SheetNavigation = () => {

  const location = useLocation();
  const path = location.pathname;
  const pathHome = "/";
  let currentLinks;
  switch (true) {
    case path.startsWith("/admin-dashboard"):
      currentLinks = navigationAdminDashboard;
      break;
    case path.startsWith("/company"):
      currentLinks = navigationCompanyDashboard;
      break;
    case path.startsWith("/recruiter"):
      currentLinks = navigationRecruiterDashboard;
      break;
    case path.startsWith("/candidate"):
      currentLinks = navigationCandidateDashboard;
      break;
    default:
      currentLinks = pathHome;
  }
  return (
    <Sheet>
      <SheetTrigger className="menu-toggle">☰</SheetTrigger>

<SheetContent side="left" className="bg-white pt-19">
  <SheetHeader>
    <SheetTitle>
      <a href="/" className="text-[]">
        <img src={logo} alt="OneMeet Logo" className="w-6 h-6" />
      </a>
      <p className="text-[14px] mb-10 text-gray-400">
        Streamlined recruiting management for businesses
      </p>
      <p className="text-[10px] text-gray-400">
        © {new Date().getFullYear()} OneMeet Bubble. All rights reserved.
      </p>
    </SheetTitle>
    <SheetDescription>
     <ul className="flex flex-col py-4">
        {currentLinks.map((item, i) => (
          <NavLink key={i} to={item.pathName} className="underline-hover">
            <li className=" underline-hover rounded-sm text-[14px] font-semibold my-0.5 px-1 py-2 hover:bg-sky-100">
              {item.navName}
            </li>
          </NavLink>
        ))}
      </ul>
      {/* <div className="flex">
      <button className="ai-cta">Login</button>
        <span className="w-[500px]"></span>
      </div> */}
    </SheetDescription>
  </SheetHeader>
</SheetContent>
    </Sheet>
  );
};
