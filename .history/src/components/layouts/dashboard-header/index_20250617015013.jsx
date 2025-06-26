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

      <div className="flex items-center justify-between px-6 py-3">

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
        <div className="hidden sm:block text-black lg:hidden">
          <nav
            className={`ai-nav ${
              menuOpen ? "show" : ""
            } translate-y-0 h-[205px] bg`}
          >
            <div className="flex gap-4 w-full pr-2 bg-amber-400">
              <div className="">
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
              <div className=" w-full bg-amber-500">
                {hoveredItem ? (
                  <div>
                    <h4 className="font-light text-lg mb-2 ms-4">
                      {hoveredItem.navName}
                    </h4>
                    <p>
                     <HoveredInfo hoveredItem={hoveredItem} />

                    </p>
                  </div>
                ) : (
                     <HoveredInfo hoveredItem={hoveredItem} />
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* sm gacha ko'rinuvchi sheet navbar */}
        <div className="flex items-center gap-4">
          <div className="block sm:hidden">
            <button>
              <SheetNavigation />
            </button>
          </div>

          <div className="hidden sm:block">
            <button
              className="hidden sm:block lg:hidden  menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>

          <button className="hidden sm:block ai-cta">Login</button>
          <div className=" block lg:hidden">
            <nav className={`ai-nav ${menuOpen ? "show" : ""} `}>
              <div className=" relative">
                <ul className="flex flex-col  left-0">
                  {currentLinks.map((item, i) => (
                    <NavLink
                      key={i}
                      to={item.pathName}
                      className="underline-hover"
                    >
                      <li className=" underline-hover text-[14px] font-semibold">
                        {item.navName}
                      </li>
                    </NavLink>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
          <button className="block sm:hidden">
            <SheetNavigation />
          </button>
          <div className="hidden sm:flex items-center gap-4">
            <button
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button> 

             <button className="ai-cta">Login</button>

          </div>
        </div>
      </div>
    </header>
  );
};
