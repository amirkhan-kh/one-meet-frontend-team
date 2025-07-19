import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { interviewAPI } from "@/lib/api";
import { BarChart3, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MobileNavigation } from "./mobile-navigation";
import { ProfileAvatar } from "./profile-avatar";

export const RecruiterDashboardHeader = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    // Load user data from localStorage
    const userData = interviewAPI.getCurrentUser();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <header className="border-b bg-white py-10">
        <div className="container mx-auto flex items-center justify-between ">
          <a href="/" className="text-xl font-bold text-blue-600">
            OneMeet
          </a>
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-white sticky top-0 py-2 z-10">
      <div className="container mx-auto flex items-center justify-between  py-3">
        <a href="#" className="ai-logo">
          OneMeet
        </a>

        <div className="flex items-center gap-4">
          {/* Dashboard Link */}
          <NavLink
            to="/recruiter/interviews-rec"
            className="hidden md:flex items-center gap-2 px-3 py-2 text-md font-medium text-gray-700 hover:text-blue-800 transition-colors"
          >
            Dashboard
          </NavLink>

          {/* Usage Link */}
          <NavLink
            to="/recruiter/usage"
            className="hidden md:flex items-center gap-2 px-3 py-2 text-md font-medium text-gray-700 hover:text-blue-800 transition-colors"
          >
            Usage
          </NavLink>

          {/* Help Link */}
          <NavLink
            to="/contact-support"
            className="hidden md:flex items-center gap-2 px-3 py-2 text-md font-medium text-gray-700 hover:text-blue-800 transition-colors"
          >
            Help
          </NavLink>

          {/* Profile Dropdown */}
          <div className="flex items-center">
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-full"
                >
                  <ProfileAvatar user={user} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {/* <p className="font-medium">{user.name}</p> */}
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <Link to={"/recruiter/profile-recruiter"}>
                  <DropdownMenuItem>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />
                <Link to="/">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <MobileNavigation currentPath={path} />
          </div>
        </div>
      </div>
    </header>
  );
};
