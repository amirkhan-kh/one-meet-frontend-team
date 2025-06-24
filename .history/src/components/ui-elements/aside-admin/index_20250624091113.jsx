import { asideNavigation } from '@/db/navLinks';
import { NavLink } from 'react-router-dom'; 

export const AsideAdmin = () => {
  return (
    <aside>
      <ul>
        {asideNavigation.map(({ navName, pathName, icon }, idx) => (
          <NavLink key={idx} to={pathName} className="underline-hover flex items-center gap-2">
            <li className="text-[14px] font-semibold flex items-center gap-2">
                <p>{<${<icon/>}/>}</p>
              {navName}
            </li>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};
