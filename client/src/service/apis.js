const BASE_URL = "http://localhost:5000/api/v1"

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/getAllCategory"
}

export const endpoints  = {
    SENDOTP_API : BASE_URL + "/user/sendotp",
    SIGNUP_API : BASE_URL + "/user/singup",
    LOGIN_API : BASE_URL + "/user/login",
    RESETPASSWORDTOKEN_API : BASE_URL + "/profile/resetPasswordTokenGenrator",
    RESETPASSWORD_API : BASE_URL + "/profile/resetPassword",
}

export const courseEndpoints = {
    COURSE_CATEGORIES_API : BASE_URL +  "/course/getAllCategory",
    CREATE_COURSE_API : BASE_URL + "/course/createCourse",
    EDIT_COURSE_API : BASE_URL + "/course/editCourse",
    CREATE_SECTION_API : BASE_URL + "/course/createSection",
    EDIT_SECTION_API : BASE_URL + "/course/editSection",
    CREATE_SUBSECTION_API : BASE_URL + "/course/createSubSection",
    EDIT_SUBSECTION_API : BASE_URL + "/course/editSubSection",
    GET_COURSE_CATEGORYBASE : BASE_URL + "/course/getCourseCategoryBase",
    GET_COURSE_DETAILS : BASE_URL + "/course/getCourseDetails",
    GET_SUBSECTION_DETAILS : BASE_URL + "/course/getSubSectionDetails",
    GET_INSTRUCTOR_COURSES : BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE_API : BASE_URL + "/course/deleteCourse",
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
    CREATE_RATING_API : BASE_URL + "/course/courseRating",
    GET_AVERAGE_RATING_API : BASE_URL + "/course/getAverageRating",
    GET_ALL_RATING_AND_REVIEW_API : BASE_URL  + "/course/getAllReview"

}

// export const studentEndpoints = {
//     COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
//     COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
//     SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
//   }

  export const profile = { 
    GET_ENROLLED_COURSE_API : BASE_URL + "/profile/enrolled-course",
  } 

  export const paymnet = {
    GET_PAYMENT_API : BASE_URL + "/payment/stripePayment"
  }

  