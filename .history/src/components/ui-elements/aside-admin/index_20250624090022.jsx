import { asideNavigation } from '@/db/navLinks'
import { NavLink } from 'react-router'

export const AsideAdmin = () => {
  return (
    <aside>
        <ul>
            {asideNavigation.map((item, i) => (
              <NavLink key={i} to={item.pathName} className="underline-hover">
                <li className=" underline-hover text-[14px] font-semibold">
                  {item.navName}
                  <span>{item.icon}/></span>
                </li>
              </NavLink>
            ))}
        </ul>
    </aside>
  )
}
