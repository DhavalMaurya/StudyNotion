import React, { useEffect, useState } from "react";
import CourseSlider from "../Components/core/Catalog/CourseSlider";
import { useParams } from "react-router-dom";
import { getCategoryDetail } from "../service/operations/courseAPI";


const Catalog = () => {
  const {courseName} = useParams();
  const [allCourses , setAllCourses] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState({});
  // const [loading , setLoading] = useState(false);

  const getCourses = async () =>{
   try {
    const CategoryDetails = await getCategoryDetail(courseName);
    setAllCourses(CategoryDetails[0].course);
    setCategoryDetail(CategoryDetails[0]);
    console.log("category detail",CategoryDetails)
  } catch (error) {
    console.log(error);
  }
  }

  useEffect(()=>{
    getCourses();
    },[courseName]);

  return (
    <div className="bg-richblack-900">
      {/* Section -1 */}
     
      <div className="text-white bg-richblack-800 p-16 px-24">
        <div className="Location text-richblack-200">
          Home / Catalog / <span className="text-yellow-50">{courseName}</span>
        </div>
        <div className="text-3xl font-bold mt-5">{courseName}</div>
        <p className="text-richblack-200 text-sm w-[60%] mt-4 tracking-wider">
         {categoryDetail.description}
        </p>
      </div>

      {/* Section -2  */}
      <div className="p-16 px-24 text-white">
        <h1 className=" text-2xl font-bold">Course to get you started</h1>
        <div className="Tabs mt-5 mb-10 text-richblack-200 flex border-0 border-b-[1px] border-richblack-200 border-collapse">
          <span className="text-yellow-50 border-0 border-b-[1px] border-yellow-50 px-2 py-1">
            Most popular
          </span>
          <span className="px-2 py-1">New</span>
          <span className="px-2 py-1">Trending</span>
        </div>
        <div className="">
            <CourseSlider courses={allCourses} heading={"Courses to get you started"} /> 
        </div>
      </div>
    </div>
  );
};

export default Catalog;
