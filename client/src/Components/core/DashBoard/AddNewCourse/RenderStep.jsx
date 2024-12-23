import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseInformation from "./CourseInformation/CourseInformation";
import CourseBuilder from "./CourseBulider/CourseBuilder";
import CoursePublish from "./CoursePublish/CoursePublish";
import { FaCheck } from "react-icons/fa6";

const RenderStep = () => {
  const renderStep = [
    {
      id: 1,
      title: "Course information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  const { step } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  

  return (
    <div>
      <div className="flex flex-col justify-between items-center ">
        <div className="flex gap-1 mt-5">
          {renderStep.map((item) => {
            return ( 
              <div key={item.id} className="flex items-center gap-1">
                <div className={`px-4 py-2 border  rounded-full w-fit ${item.id === step ?"border-yellow-50 bg-brown-700" :"border-richblack-700 bg-richblack-800 "}`}>
                {step > item.id ? (
                  <FaCheck className="font-bold text-green-500" />
                ) : (
                  item.id
                )}
                </div>
                {item.id !== 3 ? (
                  <div className="">
                    --------------------------------------
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center w-full">
          {renderStep.map((item) => {
            return <div className="-ml-6" key={item.id}>{item.title}</div>;
          })}
        </div>
      </div>
      <div>
        {step === 1 && <CourseInformation />}
        {step === 2 && <CourseBuilder />}
        {step === 3 && <CoursePublish />}
      </div>
    </div>
  );
};

export default RenderStep;
