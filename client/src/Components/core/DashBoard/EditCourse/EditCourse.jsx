import React, { useEffect, useState } from "react";
import RenderStep from "../AddNewCourse/RenderStep";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetails } from "../../../../service/operations/courseAPI";
import { setCourse, setEditCourse } from "../../../../redux/slices/courseSlice";

const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const result = await getCourseDetails(courseId, token , dispatch);
        console.log("course", result);
        if (result) {
          dispatch(setCourse(result));
          dispatch(setEditCourse(true));
          console.log(course);
        } else {
          console.log("result nahi ya ")
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseDetails();
  }, []);
  return (
    <div className="bg-richblack-800 text-white w-fit  px-20">
      <h1 className="text-3xl font-bold p-10 text-center">Edit Course</h1>
      {<RenderStep />}
    </div>
  );
};

export default EditCourse;
