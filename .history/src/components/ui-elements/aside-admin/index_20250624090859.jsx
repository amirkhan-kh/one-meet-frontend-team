import { asideNavigation } from '@/db/navLinks';
import { NavLink } from 'react-router-dom'; // react-router-dom bilan to'g'rilandi

export const AsideAdmin = () => {
  return (
    <aside>
      <ul>
        {asideNavigation.map(({ navName, pathName, icon: Icon }, idx) => (
          <NavLink key={idx} to={pathName} className="underline-hover flex items-center gap-2">
            <li className="text-[14px] font-semibold flex items-center gap-2">
              <Icon className="text-lg" /> {/* Icon komponentini to'g'ri ishlatish */}
              {navName}
            </li>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};
