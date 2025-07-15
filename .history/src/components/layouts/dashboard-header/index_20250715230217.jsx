import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  navigationAdminDashboard,
  navigationCompanyDashboard,
  navigationRecruiterDashboard,
  navigationCandidateDashboard,
} from "../../../db/navLinks";
import "./style.css";

import { SheetNavigation } from "@/components/ui-elements/sheet";
import HoveredInfo from "@/components/ui-elements/hovered-info";
import UserMenu from "@/components/ui-elements/user-menu/UserMenu";

export const DashboardHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const token = localStorage.getItem("accessToken");

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
      currentLinks = [];
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogoClick = () => {
    if (token) {
      if (path.startsWith("/admin")) navigate("/admin-dashboard");
      else if (path.startsWith("/company")) navigate("/company");
      else if (path.startsWith("/recruiter")) navigate("/recruiter");
      else if (path.startsWith("/candidate")) navigate("/candidate");
      else navigate("/admin-dashboard"); 
    } else {
      navigate("/");
    }
  };

  return (
    <header className="ai-header">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <button onClick={handleLogoClick} className="ai-logo text-left">
          OneMeet
        </button>

        {/* Desktop nav */}
        <nav className="ai-nav hidden lg:block">
          <ul className="flex items-center gap-6">
            {currentLinks.map((item, i) => (
              <NavLink key={i} to={item.pathName} className="underline-hover">
                <li className="text-[14px] font-semibold">{item.navName}</li>
              </NavLink>
            ))}
          </ul>
        </nav>

        {/* Medium screen nav */}
        <div className="hidden sm:block lg:hidden">
          <nav
            className={`ai-nav ${
              menuOpen ? "show" : ""
            } translate-y-0 h-[205px]`}
          >
            <div className="flex gap-4 w-full pr-2">
              <div>
                <ul className="text-left pl-[20px]">
                  {currentLinks.map((item, i) => (
                    <NavLink
                      key={i}
                      to={item.pathName}
                      className="underline-hover"
                    >
                      <li
                        className="underline-hover text-[14px] font-semibold"
                        onMouseEnter={() => setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {item.navName}
                      </li>
                    </NavLink>
                  ))}
                </ul>
              </div>
              <div className="w-full">
                {hoveredItem ? (
                  <div>
                    <h4 className="font-light text-lg mb-2 ms-4">
                      {hoveredItem.navName}
                    </h4>
                    <HoveredInfo hoveredItem={hoveredItem} />
                  </div>
                ) : (
                  <HoveredInfo hoveredItem={hoveredItem} />
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile and controls */}
        <div className="flex items-center gap-4">
          {/* Mobile-only sheet nav button */}
          <div className="block sm:hidden">
            <SheetNavigation />
          </div>

          {/* Medium screen toggle button */}
          <div className="hidden sm:block lg:hidden">
            <button
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>

          {/* Desktop login + user menu */}
          <div className="sm:flex items-center gap-4">
            {/* <button className="ai-cta">Login</button> */}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
