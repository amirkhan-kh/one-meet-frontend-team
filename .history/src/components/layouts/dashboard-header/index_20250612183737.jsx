import { NavLink, useLocation } from "react-router";
import {
  navigationAdminDashboard,
  navigationCompanyDashboard,
  navigationRecruiterDashboard,
  navigationCandidateDashboard,
} from "../../../db/navLinks";
import "./style.css";
import { useEffect, useState } from "react";
export const DashboardHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

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
      <div className="flex ic">
        <a href="/" className="ai-logo">
          OneMeet
        </a>

        <nav className="ai-nav">
          <ul className="flex items-center">
            {currentLinks.map((item, i) => (
              <NavLink key={i} to={item.pathName} className="underline-hover">
                <li className=" underline-hover text-[14px] font-semibold ">
                  {item.navName}
                </li>
              </NavLink>
            ))}
          </ul>
        </nav>
        <div className=" lg:hidden">
          <nav className={`ai-nav ${menuOpen ? "show" : ""}`}>
            <ul className="flex flex-col ">
              {currentLinks.map((item, i) => (
                <NavLink key={i} to={item.pathName} className="underline-hover">
                  <li className=" underline-hover text-[14px] font-semibold ">
                    {item.navName}
                  </li>
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="hidden md:block  menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
       
          <button className="ai-cta">Login</button>
        </div>
      </div>
    </header>
  );
};
