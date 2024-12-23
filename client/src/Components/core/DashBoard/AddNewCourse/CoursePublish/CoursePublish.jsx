import React from "react";
import Button from "../../../Home/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";

const CoursePublish = () => {

  const dispatch = useDispatch();
  const handlePublish = () => {
    dispatch(setStep(1));
    dispatch(setCourse(null))
  };

  return (
    <div className="text-white bg-richblack-800 p-10 flex flex-col gap-7 mt-20 border border-richblack-700 rounded-lg">
      <h1 className="text-3xl font-semibold">Publish Settings</h1>
      <div className="flex gap-2 text-xl text-richblack-200">
        <input
          type="checkbox"
          name="publishCourse"
          id="publishCourse"
          className=""
        />
        <label htmlFor="publishCourse">Make this course as public</label>
      </div>
      <div className="flex justify-end gap-5">
        <button className="px-4 py-2 bg-richblack-700 border-transparent rounded-xl">
          Back
        </button>
        <Link to={"/dashboard/my-courses"}>
          <button onClick={handlePublish()}>
            <Button active={true}>Save Chnages</Button>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CoursePublish;
