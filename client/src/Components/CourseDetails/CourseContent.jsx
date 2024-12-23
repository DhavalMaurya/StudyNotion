import React from "react";
import { FaVideo } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const CourseContent = ({ courseContent }) => {
  return (
    <div>
      {courseContent?.map((item) => (
        <details
          key={item._id}
          className="text-lg bg-richblack-700 w-[60%] border-[1px] border-richblack-800"
        >
          <div className="px-5 py-5 text-richblack-5 flex gap-3 items-center bg-richblack-900">
            <div className="flex flex-col gap-5 ">
              {item.subSections?.map((subsection) => (
                <div className="flex items-center gap-3 " key={subsection._id} >
                  <FaVideo />
                  <span className="">{subsection.title}</span>
                </div>
              ))}
            </div>
          </div>
          <summary className=" flex justify-between items-center bg-richblack-700 px-5 py-5">
            <div className="flex gap-3 items-center">
              <IoIosArrowDown className="text-white" />
              <span>{item.sectionName}</span>
            </div>
            <span className="text-yellow-50">{item.subSections?.length} lectures</span>
          </summary>
        </details>
      ))}
    </div>
  );
};

export default CourseContent;
