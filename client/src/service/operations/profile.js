import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../apiconnector";
import { profile} from "../apis"

const {GET_ENROLLED_COURSE_API} = profile;

export async function getUserEnrolledCourses(token ,userId) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
      const response = await apiConnector(
        "POST",
        GET_ENROLLED_COURSE_API,
        token,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
      console.log(
        "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
        response
      )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
  }