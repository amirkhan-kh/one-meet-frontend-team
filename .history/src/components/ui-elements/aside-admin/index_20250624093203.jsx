import { asideNavigation } from '@/db/navLinks';
import { NavLink } from 'react-router-dom'; 

export const AsideAdmin = () => {
  return (
    <aside className='bg-white h-screen pt-10 w-[220px]'>
      <ul className='px-4 flex flex-col g'>
        {asideNavigation.map(({ navName, pathName, icon: Icon }, idx) => (
          <NavLink key={idx} to={pathName}
           className="underline-hover flex items-center gap-2 py-2 hover:bg-amber-300">
            <li className="text-[14px] font-semibold flex items-center gap-2">
             {Icon && <Icon className="text-lg" />}
              {navName}
            </li>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

