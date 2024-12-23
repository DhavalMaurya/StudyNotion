import React from "react";
import { HiUsers } from "react-icons/hi2";
import { PiTreeStructureFill } from "react-icons/pi";

const Card = ({heading , description ,color}) => {
  return (
    <div className={`${color ? "bg-white" :"bg-richblack-800"} w-[17rem] pb-2 pt-2  shadow-2xl shadow-richblack-700  rounded-2xl pl-1 hover:scale-105 transition-all duration-300`}>
     <div className="px-3 pt-2">
     <div className={`text-xl font-semibold ${color ? "text-richblack-700" : "text-white" }`}>{heading}</div>
      <div className="text-sm text-gray-500 mt-2 mb-16">
       {description}
      </div>
     </div>
      <div className="pt-1  text-blue-100 flex items-center border-t-2 border-dotted border-blue-100 justify-between  px-2">
        <div className="flex items-center justify-start gap-2 w-[50%] text-left">
          <HiUsers />
          <span>Beginner</span>
        </div>
        <div className="flex items-center justify-end gap-2 w-[50%]">
        <PiTreeStructureFill className='rotate-90' />
        <span>6 Lessons</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
