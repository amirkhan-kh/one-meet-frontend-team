import { NavLink, useLocation } from "react-router";
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
export const CompanyHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="ai-header">
      <div className="flex items-center justify-between px-6 py-3">
        <a href="/" className="ai-logo">
          OneMeet
        </a>

        <nav className="ai-nav">
          <ul className="flex items-center ">
            {currentLinks.map((item, i) => (
              <NavLink key={i} to={item.pathName} className="underline-hover">
                <li className=" underline-hover text-[14px] font-semibold">
                  {item.navName}
                </li>
              </NavLink>
            ))}
          </ul>
        </nav>

        {/* sm dan lg gacha block navigation */}
        <div className="hidden sm:block lg:hidden">
          <nav
            className={`ai-nav ${
              menuOpen ? "show" : ""
            } translate-y-0 h-[230px]`}
          >
            <div className="flex gap-4 w-full pr-2 ">
              <div className="">
                <ul className="text-left pl-[20px] w-[170px]">
                  {currentLinks.map((item, i) => (
                    <NavLink
                      key={i}
                      to={item.pathName}
                      className="underline-hover "
                    >
                      <li
                        className="underline-hover text-[15px] font-semibold py-2"
                        onMouseEnter={() => setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {item.navName}
                      </li>
                    </NavLink>
                  ))}
                </ul>
              </div>
              <div className=" w-full">
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
        </div>
      </div>
    </header>
  );
};
