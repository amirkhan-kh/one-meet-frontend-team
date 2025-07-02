import { NavLink, useNavigate } from "react-router-dom";
import { navigationCompanyDashboard } from "../../../../db/navLinks";
import { useEffect, useState } from "react";
import { SheetNavigation } from "@/components/ui-elements/sheet";
import HoveredInfo from "@/components/ui-elements/hovered-info";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchUserProfile } from "@/store/company-service/profile-get";
export const CompanyHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dispatch = useDispatch();

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
useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
   const navigate = useNavigate();

  const deleteToken = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken"); // tokenni o'chirish
    navigate("/"); // asosiy sahifaga o'tish
  };
  return (
    <header className="ai-header">
      <div className="flex items-center justify-between px-6 py-3">
        <a href="/" className="ai-logo">
          OneMeet
        </a>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <nav className="ai-nav">
              <ul className="flex items-center ">
                {navigationCompanyDashboard.map((item, i) => (
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
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                 <NavLink to="profile-company">
                   Profile
                 </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NavLink to="/contact-support">

                    Help
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={deleteToken}>
                    Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
                    {navigationCompanyDashboard.map((item, i) => (
                      <NavLink
                        key={i}
                        to={item.pathName}
                        className="underline-hover "
                        onClick={() => setMenuOpen(false)}
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
          </div>
        </div>
      </div>
    </header>
  );
};
