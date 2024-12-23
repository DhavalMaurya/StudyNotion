import React, { useEffect, useState } from 'react'
import InstructorCourse from './InstructorCourses/InstructorCourse'
import { getInstructorCourses } from '../../../service/operations/courseAPI';
import { useSelector } from 'react-redux';
import { deleteCourse } from '../../../service/operations/courseAPI';

const MyCourses = () => {
  const {token} = useSelector(state => state.auth);
  const {user} = useSelector(state => state.profile)
  const [courses ,setCourses] = useState([]);

  const handleDeleteCourse = async (id)=>{
    try {
      const result = await deleteCourse(token , id);
      console.log(result);
      fetchCourses();
    } catch (error) {
     console.log(error); 
    }
  }

  const fetchCourses = async () =>{
   try {
    const result = await getInstructorCourses(token , user._id);
    console.log(result); 
    setCourses(result);
   } catch (error) {
    console.log(error)
   }
  }

  

  useEffect(()=>{
    fetchCourses();
  },[])
  return (
      <InstructorCourse courses={courses} handleDeleteCourse={handleDeleteCourse} />
  )
}

export default MyCourses