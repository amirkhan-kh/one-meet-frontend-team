import "./style.css";
import logo from "../../../assets/one_meet_logo.png";
import { NavLink, useLocation } from "react-router";
import {
  navigationAdminDashboard,
  navigationCandidateDashboard,
  navigationCompanyDashboard,
  navigationRecruiterDashboard,
} from "@/db/navLinks";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

export const DashboardFooter = () => {
  const location = useLocation();
  const path = location.pathname;
  const pathHome = "/";
  let currentLinks;
  switch (true) {
    case path.startsWith("/admin-dashboard"):
      currentLinks = navigationAdminDashboard;
      break;
    case path.startsWith("/company-dashboard"):
      currentLinks = navigationCompanyDashboard;
      break;
    case path.startsWith("/recruiter-dashboard"):
      currentLinks = navigationRecruiterDashboard;
      break;
    case path.startsWith("/candidate-dashboard"):
      currentLinks = navigationCandidateDashboard;
      break;
    default:
      currentLinks = pathHome;
  }
  return (
    <footer className="px-2 md:px-6 py-8">
      <div className="flex flex-col  md:flex-row items-start md:items-center justify-between w-full">
        <div className="pr-4">
          <a href="/" className="text-[]">
            <img src={logo} alt="OneMeet Logo" className="w-6 h-6" />
          </a>
          <p className="text-[14px] mb-20 text-gray-400">
            Streamlined recruiting management for businesses
          </p>
          <p className="text-[10px] text-gray-400">
            © {new Date().getFullYear()} OneMeet Bubble. All rights reserved.
          </p>
        </div>
        <div className="flex   justify-between sm:justify-evenly w-full px-1 sm:px-4">
          <span className="hidden md:block w-[200px]"></span>
          <ul>
            <li className="text-[14px] mb-3">
              <strong>Navigation</strong>
            </li>
            {currentLinks.map((item, i) => (
              <NavLink key={i} to={item.pathName} className="underline-hover">
                <li className=" underline-hover text-[14px] font-light my-2">
                  {item.navName}
                </li>
              </NavLink>
            ))}
          </ul>
          <ul className="pt-6">
            <NavLink>
              <li className=" underline-hover text-[14px] font-light my-2 flex items-center gap-2">
                <FaTwitter /> Twitter
              </li>
            </NavLink>
            <NavLink>
              <li className=" underline-hover text-[14px] font-light my-2 flex items-center gap-2">
                <FaFacebookF />
                Facebook
              </li>
            </NavLink>
            <NavLink>
              <li className=" underline-hover text-[14px] font-light my-2 flex items-center gap-2">
                <FaInstagram />
                Instagram
              </li>
            </NavLink>
            <NavLink>
              <li className=" underline-hover text-[14px] font-light my-2 flex items-center gap-2">
                <FaTelegramPlane />
                Telegram
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </footer>
  );
};
