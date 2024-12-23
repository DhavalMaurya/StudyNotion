import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails } from "../service/operations/courseAPI";
import CourseVideo from '../Components/core/ViewCourse/CourseVideo'
import CouresViewSidebar from '../Components/core/ViewCourse/CouresViewSidebar'

export const ViewCourse = () => {
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const [courseDetails , setCourseDetails] = useState({})
    const dispatch = useDispatch()

    console.log(courseId);
    const fetchCourseDetails = async ()=>{
        const result = await getCourseDetails(courseId ,token ,dispatch);
        console.log("view course page ",result);
        setCourseDetails(result)
    }

    useEffect(()=>{
        fetchCourseDetails();
    },[])

  return (
    <div className='flex w-full h-full bg-richblack-800'>
        <CouresViewSidebar course={courseDetails} />
        <Outlet />
    </div>
  )
}
