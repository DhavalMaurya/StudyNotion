import React, { useState } from "react";
import { FaVideo } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import RatingModal from "./RatingModal";  

const CouresViewSidebar = ({ course }) => {
  const { courseContent ,_id } = course;
  const [ratingModal , setRatingModal] = useState(null);
  const cancelReviewModal = () => {
    setRatingModal(null);
  }
  return (
    <div className="pt-10 flex flex-col items-center border-r border-richblack-100 w-[25%] ">
      <div className="flex justify-start w-full px-2 mb-5">
        <h1 className="text-white text-3xl font-bold">
          Coures Content
        </h1>
      </div>
      {courseContent?.map((item) => (
        <details
          key={item._id}
          className="text-sm text-white w-full border-[1px] border-richblack-800"
        >
          <div className="px-5 py-5 text-richblack-5 flex gap-3 items-center bg-richblack-800">
            <div className="flex flex-col gap-5 ">
              {item.subSections?.map((subsection) => (
                <Link
                  to={`/view-course/${course._id}/${subsection._id}`}
                  key={subsection._id}
                >
                  <div className="flex items-center gap-3 ">
                    <FaVideo />
                    <span className="">{subsection.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <summary className=" flex justify-between items-center bg-richblack-700 px-5 py-5">
            <div className="flex gap-3 items-center">
              <IoIosArrowDown className="text-white" />
              <span>{item.sectionName}</span>
            </div>
            <span className="text-yellow-50">
              {item.subSections.length} lectures
            </span>
          </summary>
        </details>
      ))}
      <button onClick={()=>{setRatingModal(true)}} className="bg-yellow-25 text-richblack-800 w-[80%] mt-5 border-transparent rounded-md px-2 py-1 font-bold">
        Review Course
      </button>

      {
        ratingModal ?<RatingModal cancleReviewModal={cancelReviewModal} courseId={_id}/> : ""
      }
    </div>
  );
};

export default CouresViewSidebar;
