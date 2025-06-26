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
             {Icon && <Icon className="text-lg" />}
 {/* JSX ichida Icon komponentini chaqirish */}
              {navName}
            </li>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

