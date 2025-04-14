// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CourseInformation from "./CourseInformation/CourseInformation";
// import CourseBuilder from "./CourseBulider/CourseBuilder";
// import CoursePublish from "./CoursePublish/CoursePublish";
// import { FaCheck } from "react-icons/fa6";

// const RenderStep = () => {
//   const renderStep = [
//     {
//       id: 1,
//       title: "Course information",
//     },
//     {
//       id: 2,
//       title: "Course Builder",
//     },
//     {
//       id: 3,
//       title: "Publish",
//     },
//   ];

//   const { step } = useSelector((state) => state.course);
//   const dispatch = useDispatch();
  

//   return (
//     <div>
//       <div className="flex flex-col justify-between items-center ">
//         <div className="flex gap-1 mt-5">
//           {renderStep.map((item) => {
//             return ( 
//               <div key={item.id} className="flex items-center gap-1">
//                 <div className={`px-4 py-2 border  rounded-full w-fit ${item.id === step ?"border-yellow-50 bg-brown-700" :"border-richblack-700 bg-richblack-800 "}`}>
//                 {step > item.id ? (
//                   <FaCheck className="font-bold text-green-500" />
//                 ) : (
//                   item.id
//                 )}
//                 </div>
//                 {item.id !== 3 ? (
//                   <div className="">
//                     --------------------------------------
//                   </div>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             );
//           })}
//         </div>
//         <div className="flex justify-between items-center w-full">
//           {renderStep.map((item) => {
//             return <div className="-ml-6" key={item.id}>{item.title}</div>;
//           })}
//         </div>
//       </div>
//       <div>
//         {step === 1 && <CourseInformation />}
//         {step === 2 && <CourseBuilder />}
//         {step === 3 && <CoursePublish />}
//       </div>
//     </div>
//   );
// };

// export default RenderStep;



import React from "react";
import { useSelector } from "react-redux";
import CourseInformation from "./CourseInformation/CourseInformation";
import CourseBuilder from "./CourseBulider/CourseBuilder";
import CoursePublish from "./CoursePublish/CoursePublish";
import { FaCheck } from "react-icons/fa6";

const RenderStep = () => {
  const renderStep = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  const { step } = useSelector((state) => state.course);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Step Navigation */}
      <div className="flex flex-col items-center mt-8">
        <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
          {renderStep.map((item, index) => (
            <div key={item.id} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                  item.id === step
                    ? "border-yellow-400 bg-yellow-900 text-yellow-200"
                    : item.id < step
                    ? "border-green-500 bg-green-900 text-green-200"
                    : "border-gray-600 bg-gray-800 text-gray-400"
                }`}
              >
                {item.id < step ? (
                  <FaCheck className="text-lg sm:text-xl" />
                ) : (
                  <span className="text-lg sm:text-xl font-semibold">{item.id}</span>
                )}
              </div>
              {/* Divider */}
              {index < renderStep.length - 1 && (
                <div
                  className={`h-1 w-12 sm:w-16 md:w-24 transition-all duration-300 ${
                    item.id < step ? "bg-green-500" : "bg-gray-600"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        {/* Step Titles */}
        <div className="flex justify-between w-full mt-4 text-sm sm:text-base">
          {renderStep.map((item) => (
            <div
              key={item.id}
              className={`text-center flex-1 ${
                item.id === step ? "text-yellow-200 font-semibold" : "text-gray-400"
              }`}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      {/* Step Content */}
      <div className="mt-8">
        {step === 1 && <CourseInformation />}
        {step === 2 && <CourseBuilder />}
        {step === 3 && <CoursePublish />}
      </div>
    </div>
  );
};

export default RenderStep;