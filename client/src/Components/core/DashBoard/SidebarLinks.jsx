import React, {  } from 'react'
import * as Icons from "react-icons/vsc"
import { useLocation, NavLink, matchPath } from "react-router-dom";


const SidebarLinks = ({iconName , link}) => {

    const location = useLocation();
    const matchRoute = (route) => {
      return matchPath({ path: route }, location.pathname);
    };

    const Icon = Icons[iconName]
  return (
    <NavLink to={link.path} className={`text-sm flex gap-2 justify-start  items-center px-10 py-2 ${matchRoute(link.path) ? "border-0 border-l-4 border-l-yellow-50  bg-yellow-800 text-yellow-50": "" } `} onClick={()=>{}} >
        <div>
            <Icon />
        </div>
        <div>
            {link.name}
        </div>
    </NavLink>
  )
}

export default SidebarLinks