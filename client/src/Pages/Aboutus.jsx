import React from "react";

import Footer from "../Components/Footer"
import HighlitedText from "../Components/core/Home/HighlitedText";
import image1 from "../assets/aboutus1.jpeg";
import image2 from "../assets/aboutus2.jpeg";
import image3 from "../assets/aboutus3.jpeg";
import Quote from "../Components/core/Aboutus/Quote";
import MissonAndVision from "../Components/core/Aboutus/MissonAndVision";
import FoundingStory from "../Components/core/Aboutus/FoundingStory";

const Aboutus = () => {

  return (
    <div className="bg-richblack-900">
      {/* section1 */}
      <div className="flex justify-center items-center flex-col gap-5 pt-14 bg-richblack-700 text-gray-400">
        <p>About us</p>
        <div className="text-3xl text-white font-bold text-center">
          <p>Driving Innovation in Online Education for a </p>
          <HighlitedText>Brighter Future</HighlitedText>
        </div>
        <p className="text-center w-[50%]">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </p>
        <div className="flex justify-center gap-7 mt-5 -mb-16">
          <img src={image1} alt="" className="w-[25%]" />
          <img src={image2} alt="" className="w-[25%]" />
          <img src={image3} alt="" className="w-[25%]" />
        </div>
      </div>

      {/* section-2 */}
      <div className=" text-3xl font-bold text-white px-48 p-20 pt-40 bg-richblack-900">
        <Quote />
      </div>

      {/* section-3 */}
      <div>
        <FoundingStory />
      </div>

      {/* section-4 */}
      <div>
        <MissonAndVision />
      </div>

      {/* section-5 */}
      <div className="bg-richblack-800 flex items-center justify-around px-28 py-20 mb-20">
        <div className="flex flex-col justify-center items-center">
          <span className="text-white text-5xl font-bold">5k</span>
          <span className="text-gray-500 text-2xl">Active Students</span>
        </div>
        <div className="flex flex-col justify-center items-center">
        <span className="text-white text-5xl font-bold">10+</span>
        <span className="text-gray-500 text-2xl">Mentors</span>
        </div>
        <div className="flex flex-col justify-center items-center">
        <span className="text-white text-5xl font-bold">200+</span>
        <span className="text-gray-500 text-2xl">Courses</span>
        </div>
        <div className="flex flex-col justify-center items-center">
        <span className="text-white text-5xl font-bold">50+</span>
        <span className="text-gray-500 text-2xl">Awards</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
