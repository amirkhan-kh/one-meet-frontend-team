import { NavLink, useLocation } from "react-router-dom";
import {
  navigationAdminDashboard,
  navigationCompanyDashboard,
  navigationRecruiterDashboard,
  navigationCandidateDashboard,
} from "../../../db/navLinks";
import "./style.css";
import { useEffect, useState } from "react";
import { SheetNavigation } from "@/components/ui-elements/sheet";
import HoveredInfo from "@/components/ui-elements/hovered-info";

export const DashboardHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const path = location.pathname;

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
      currentLinks = [];
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="ai-header">
      <div className="flex items-center justify-between px-6 py-3 w-full">
        <a href="/" className="ai-logo">
          OneMeet
        </a>

        <nav className="ai-nav hidden lg:block">
          <ul className="flex items-center gap-6">
            {currentLinks.map((item, i) => (
              <NavLink key={i} to={item.pathName} className="underline-hover">
                <li className="text-[14px] font-semibold">{item.navName}</li>
              </NavLink>
            ))}
          </ul>
        </nav>

        {/* sm dan lg gacha block navigation */}
        <div className="hidden sm:block lg:hidden">
          <nav
            className={`ai-nav ${menuOpen ? "show" : ""} translate-y-0 h-[205px]`}
          >
            <div className="flex gap-4 w-full pr-2">
              <div className="bg-amber-400 w-[200px]">
                <ul className="text-left pl-[20px] bg-sky">
                  {currentLinks.map((item, i) => (
                    <NavLink
                      key={i}
                      to={item.pathName}
                      className="underline-hover"
                    >
                      <li
                        className="text-[15px] font-semibold"
                        onMouseEnter={() => setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {item.navName}
                      </li>
                    </NavLink>
                  ))}
                </ul>
              </div>
              <div className="w-full ">
                <HoveredInfo hoveredItem={hoveredItem} />
              </div>
            </div>
          </nav>
        </div>

        {/* sm gacha: mobil menyu */}
        <div className="block sm:hidden">
          <SheetNavigation />
        </div>

        {/* menyu tugmasi (tabletda) */}
        <div className="hidden sm:flex gap-2 lg:hidden">
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>

        {/* login button */}
        <div className="w-[100px]">

        <button className="hidden sm:block ai-cta">Login</button>
        </div>
        </div>
      </div>
    </header>
  );
};
