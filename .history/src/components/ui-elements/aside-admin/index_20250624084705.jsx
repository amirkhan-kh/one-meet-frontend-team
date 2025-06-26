import React from 'react'

export const AsideAdmin = () => {
  return (
    <aside>
        <ul>
            {currentLinks.map((item, i) => (
              <NavLink key={i} to={item.pathName} className="underline-hover">
                <li className=" underline-hover text-[14px] font-semibold">
                  {item.navName}
                </li>
              </NavLink>
            ))}
        </ul>
    </aside>
  )
}
