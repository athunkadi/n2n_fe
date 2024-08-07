import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function SidebarSubmenu({ id, name, path, parent, submenu }) {
  const location = useLocation();

  return (
    <>
      <details open={location.state?.menu?.submenu?.parent === id}>
        <summary className={location.state?.menu?.submenu?.parent === id ? 'bg-white font-semibold text-black rounded-br-none pl-3' : 'font-normal pl-3'}>
          <NavLink
            to={path !== null ? path : "#"}
            state={{
              menu: path !== null ? {
                id: id,
                name: name,
                path: path,
                parent: parent,
                submenu: submenu,
              } : location?.state?.menu
            }}
          >
            <div className='flex gap-2 items-center'>
              {name}
            </div>
          </NavLink>
        </summary>
        <ul>
          {submenu.map((v, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={v.path}
                  className={({ isActive }) => `${isActive ? 'bg-white bg-opacity-10 font-semibold text-white rounded-full' : 'font-normal text-white'}`}
                  state={{
                    menu: {
                      id: id,
                      name: name,
                      path: path,
                      parent: parent,
                      submenu: v,
                    },
                  }}
                >
                  <div className='flex gap-2 items-center'>
                    {/* <HiBell />  */}
                    {v.name}
                  </div>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </details>
    </>
  )
}

export default SidebarSubmenu