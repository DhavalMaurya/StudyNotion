import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";
import { setCoursePurchased } from "../../redux/slices/courseSlice";


const { COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    GET_COURSE_DETAILS,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    GET_COURSE_CATEGORYBASE,
    GET_SUBSECTION_DETAILS,
    GET_INSTRUCTOR_COURSES,
    EDIT_COURSE_API,
    EDIT_SECTION_API,
    EDIT_SUBSECTION_API,
    DELETE_COURSE_API,
    CREATE_RATING_API,
    GET_AVERAGE_RATING_API,
    GET_ALL_RATING_AND_REVIEW_API,
    DELETE_SECTION_API,
} = courseEndpoints;

//fetch allCourseCategory
export const getAllCategory = async () => {
    const toastId = toast.loading("Loading");
    let result = [];
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        if (!response.data.success) {
            throw new Error("Could not fetch Course categories")
        }
        result = response.data.data;
    } catch (error) {
        console.log("GET_ALL_COURSE_API API ERROR............", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const getCategoryDetail = async (name) => {
    const toastId = toast.loading("Loading");
    let result = [];
    try {
        const response = await apiConnector("POST", GET_COURSE_CATEGORYBASE, { name });
        if (!response.data.success) {
            toast.error("failed to get courses");
        }
        result = response.data.selectedCategory
    } catch (error) {
        console.log("get course category base API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//create new course
export const createCourse = async (formData, token) => {
    const toastId = toast.loading("Loading");
    let result = null;
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
            "Content-Type": "multipart/form-data",
        })
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response.data.success) {
            throw new Error("Could not create course")
        }
        result = response.data.data
        toast.success("Course created successfully");

    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const updateCourse = async (formData, courseId, token) => {
    formData.append("courseId", courseId)
    const toastId = toast.loading("Loading");
    let result = null;
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, formData, {
            "Content-Type": "multipart/form-data",
        })
        console.log("UPDATE COURSE API RESPONSE............", response)
        if (!response.data.success) {
            throw new Error("Could not update course")
        }
        result = response.data.data
        toast.success("Course update successfully");

    } catch (error) {
        console.log("UPDATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}
//create section
export const createSection = async (data, token) => {
    const toastId = toast.loading("Loading");
    let result = null;
    // console.log("token : ",token)
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            "Content-Type": "multipart/form-data",
            // Authorization : `Bearer ${token}`,
        })
        console.log("Create section API response .....", response);
        if (!response.data.success) {
            throw new Error("Could not create section")
        }
        result = response.data.data;
        toast.success("Section created successfully");

    } catch (error) {
        console.log("CREATE Section API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}

export const editSection = async (sectionId, formData, token) => {
    formData.append("sectionId", sectionId);
    const toastId = toast.loading("Loading");
    let result = null;
    // console.log("token : ",token)
    try {
        const response = await apiConnector("POST", EDIT_SECTION_API, formData, {
            "Content-Type": "multipart/form-data",
            // Authorization : `Bearer ${token}`,
        })
        console.log("UPDATE section API response .....", response);
        if (!response.data.success) {
            throw new Error("Could not update section")
        }
        result = response.data.data;
        toast.success("Section updated successfully");

    } catch (error) {
        console.log("UPDATE Section API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}

export const deleteSection = async (sectionId , courseId , token) => {
    const toastId = toast.loading("Loading");
    let result = null ; 
    try {
        const response = await apiConnector("DELETE" ,DELETE_SECTION_API ,{sectionId , courseId ,token});
        if (!response.data.success) {
            throw new Error("Could not delet subsection")
        }
        toast.success(response.data.message);
        result = response.data.updatedCourse
    } catch (error) {
        console.log("DELETE SECTION API ERROR............", error)
    }
    toast.dismiss(toastId)
    return result;
}

export const createSubSection = async (data) => {
    const toastId = toast.loading("Loading");
    let result;
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            "Content-Type": "multipart/form-data",
        })
        console.log("CREATE SUBSECTION API RESPONSE............", response)
        if (!response.data.success) {
            throw new Error("Could not create subsection")
        }
        result = response.data.data;
        toast.success("Sub section created successfully");
    } catch (error) {
        console.log("CREATE SUBSECTION API ERROR............", error)
    }
    toast.dismiss(toastId);
    return result;
}

export const editSubSection = async (data) => {
    const toastId = toast.loading("Loading");
    let result;
    try {
        const response = await apiConnector("POST", EDIT_SUBSECTION_API, data, {
            "Content-Type": "multipart/form-data",
        })
        console.log("EDIT SUBSECTION API RESPONSE............", response)
        if (!response.data.success) {
            throw new Error("Could not create subsection")
        }
        result = response.data.data;
        toast.success("Sub section edit successfully");
    } catch (error) {
        console.log("EDIT SUBSECTION API ERROR............", error)
    }
    toast.dismiss(toastId);
    return result;
}

export const getCourseDetails = async (courseId, token, dispatch) => {
    const toastId = toast.loading("Loading");
    let result = null;
    try {
        const response = await apiConnector("POST", GET_COURSE_DETAILS, { courseId, token });
        if (!response.data.success) {
            throw new Error("Could not get course details")
        }
        // console.log(response.data)
        dispatch(setCoursePurchased(response.data.coursePurchased))
        result = response.data.data;
    } catch (error) {
        console.log("GET COURSE DETAILS API ERROR............", error)
    }
    toast.dismiss(toastId);
    return result;
}

export const getSubsectionDetail = async (subSectionId, token) => {
    const toastId = toast.loading("Loading");
    let result = null;
    try {
        const response = await apiConnector("POST", GET_SUBSECTION_DETAILS, { subSectionId, token });
        if (!response.data.success) {
            throw new Error("Could not get subsection")
        }
        result = response.data.data;
    } catch (error) {
        console.log("GET Sub section DETAILS API ERROR............", error)
    }
    toast.dismiss(toastId);
    return result;
}

export const getInstructorCourses = async (token, id) => {
    const toastId = toast.loading("Loading");
    let result = null;
    try {
        const response = await apiConnector("POST", GET_INSTRUCTOR_COURSES, { id, token });
        if (!response.data.success) {
            throw new Error("Could not get courses")
        }
        result = response.data.data;
    } catch (error) {
        console.log("GET INSTRUCTOR COURSES DETAILS API ERROR............", error)
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteCourse = async (token, id) => {
    const toastId = toast.loading("Loading");
    let result = null;
    try {
        const response = await apiConnector("POST", DELETE_COURSE_API, { courseId: id, token })
        console.log("DELETE COURSE API RESPONSE............", response)
        if (!response.data.success) {
            throw new Error("Could not update course")
        }
        toast.success("Course Delete successfully");

    } catch (error) {
        console.log("Delete COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const createRating = async (rating, review, courseId, token) => {
    const toastId = toast.loading("Loading");
    let response = null;
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        response = await apiConnector("POST", CREATE_RATING_API, { rating, review, courseId }, headers);
        if (!response) {
            throw new Error("Could not add rating , something went wrong try again later");
        }
        toast.success("Thanks for your review");
    } catch (error) {
        console.log("ADD COURSE REVIEW API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return response;
}

export const getAvgRating = async (courseId, token) => {
    // const toastId = toast.loading("Loading");
    let response = null;
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        console.log("course",courseId)
        response = await apiConnector("POST", GET_AVERAGE_RATING_API, { courseId }, headers);
        if (!response) {
            throw new Error("Could not get avg rating , something went wrong try again later");
        }
    } catch (error) {
        console.log("GET COURSE AVG RATING API ERROR............", error)
        toast.error(error.message)
    }
    return response;
}

export const getAllRatingReview = async()=>{
    let response = null;
    try {
        response = await apiConnector("GET", GET_ALL_RATING_AND_REVIEW_API);
        if (!response) {
            throw new Error("Could not get all rating , something went wrong try again later");
            }
    } catch (error) {
        console.log("GET ALL RATING API ERROR............", error)
        toast.error(error.message)
    }

    return response.data;
}