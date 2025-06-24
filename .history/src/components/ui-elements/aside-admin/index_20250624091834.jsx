import { asideNavigation } from '@/db/navLinks';
import { NavLink } from 'react-router-dom'; // React-Router DOM importi to‘g‘risi

export const AsideAdmin = () => {
  return (
    <aside>
      <ul>
        {asideNavigation.map(({ navName, pathName, icon: Icon }, idx) => (
          <NavLink key={idx} to={pathName} className="underline-hover flex items-center gap-2">
            <li className="text-[14px] font-semibold flex items-center gap-2">
              {/* Icon komponentini to‘g‘ri ishlatish */}
              <Icon className="text-lg" /> {/* JSX ichida Icon komponentini chaqirish */}
              {navName}
            </li>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { HiTv } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { HiChartBar } from "react-icons/hi";
import { MdAdminPanelSettings } from "react-icons/md";

// `asideNavigation` to‘g‘ri import va ma’lumotlar
export const asideNavigation = [
    { navName: "Companies", pathName: "/admin-dashboard", icon: HiBuildingOffice2},
    { navName: "Recruiters", pathName: "recruiters-table", icon: HiUsers},
    { navName: "Candidates", pathName: "candidate-table", icon: FaUsers},
    { navName: "Interviews", pathName: "interviews-table", icon: HiTv},
    { navName: "Payments", pathName: "payments-table", icon: FaMoneyCheckDollar},
    { navName: "Reports", pathName: "reports-table", icon: HiChartBar},
    { navName: "Admins", pathName: "admins-table", icon: MdAdminPanelSettings},
];
