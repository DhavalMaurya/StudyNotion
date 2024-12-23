import React, { useState } from "react";
import SidebarLinks from "./SidebarLinks";
import DashboardLinks from "../../../Data/DashboardLinks";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate} from "react-router-dom";
import { LuSettings } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../service/operations/authAPI";
import ConfirmationModal from "../../ConfirmationModal";

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modalData ,setModalData]  = useState(null)
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className="text-richblack-100 bg-richblack-800 w-[15%] h-full py-10 ">
      <div className="flex flex-col gap-2">
        {DashboardLinks.map((link) => {
           if (link.type && user?.accountType !== link.type) return null;
           return <SidebarLinks key={link.id} link={link} iconName = {link.icon}/>
          // return (
          //   <SidebarLinks iconName={link.icon} link={link} key={link.id} />
          // );
        })}
        <NavLink
          className={`text-sm flex gap-2 justify-start  items-center px-10 py-2 `}
           onClick={() =>
            setModalData({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logOut(navigate)),
              btn2Handler: () => setModalData(null),
            })
          }
        >
          <div>
            <BiLogOut />
          </div>
          <div>Log out</div>
        </NavLink>
        <NavLink
          className={`text-sm flex gap-2 justify-start  items-center px-10 py-2 `}
          onClick={() => {}}
        >
          <div>
            <LuSettings/>
          </div>
          <div>Settings</div>
        </NavLink>
      </div>
      {modalData && <ConfirmationModal modalData={modalData} />}
    </div>
  );
};

export default Sidebar;
