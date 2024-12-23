import React from "react";
import banner2 from "../../../assets/video/home-Section-2.mp4";
import Logo1 from "../../../assets/Timeline-logo/logo1.svg";
import Logo2 from "../../../assets/Timeline-logo/logo2.svg";
import Logo3 from "../../../assets/Timeline-logo/logo3.svg";
import Logo4 from "../../../assets/Timeline-logo/logo4.svg";

const Timeline = () => {
  const timeLine = [
    {
      logo: Logo1,
      heading: "Leadership",
      description: "Fully committed to the success company",
    },
    {
      logo: Logo2,
      heading: "Responsbility",
      description: "Students will always be our top priority",
    },
    {
      logo: Logo3,
      heading: "Flexibility",
      description: "The ability to switch is an important skills",
    },
    {
      logo: Logo4,
      heading: "Solve the problem",
      description: "Code your way to a solution",
    },
  ];

  return (
    <div className="flex mt-20 mb-20 max-lg:flex-col ">
      <div className="Left w-[40%] max-lg:w-fit flex flex-col justify-center">
        {timeLine.map((item) => {
          return (
            <div className="mt-1" key={item.logo}>
              <div className="flex gap-6">
                <div className="border-transparent rounded-full bg-white p-4 h-fit w-fit">
                  {" "}
                  <img src={item.logo} alt="logo" className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{item.heading}</h1>
                  <p className="text-lg">{item.description}</p>
                </div>
              </div>
              {item.logo !== Logo4 ? (
                <div className="px-7 text-gray-700 text-[5px]">
                  <p>|</p>
                  <p>|</p>
                  <p>|</p>
                  <p>|</p>
                  <p>|</p>
                  <p>|</p>
                  <p>|</p>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <div className="Right relative w-[60%] max-lg:w-fit ">
        <video src={banner2} loop muted autoPlay></video>
        <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-evenly bg-[#014A32] text-white px-6 py-10 w-[60%]  max-lg:hidden">
          <div className="flex justify-center items-center gap-5 border-r-2 border-gray-200">
            <span className="text-4xl font-bold">10 +</span>
            <span className="text-sm text-[#05A77B] w-20">Year of Exprience</span>
          </div>
          <div className="flex justify-center items-center gap-5">
            <span className="text-4xl font-bold">250 +</span>
            <span className="text-sm text-[#05A77B] w-20">Type of Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
