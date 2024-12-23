const express = require('express')
const { createCourse, getAllCourse, getCourseDetail, getInstructorCourses, editCourse, deleteCourse } = require('../controller/Course');
const { auth, isAdmin, isInstructor } = require('../middlewares/auth');
const { createCategory, getAllCategory, categoryPageDetails } = require('../controller/Category');
const { createSection, updateSection, deleteSection } = require('../controller/Section');
const { createSubsection, getSubSectionDetails, updateSubsection } = require('../controller/Subsection');
const courseRoute = express.Router();
const { coursePurchased } = require('../middlewares/course-middleware')
const { createRating, getAverageRating, getAllRatingAndReview } = require('../controller/RatingAndReview')

//category
courseRoute.post("/createCategory", auth, createCategory);
courseRoute.get("/getAllCategory", getAllCategory);
courseRoute.post("/getCourseCategoryBase", categoryPageDetails);

//course
courseRoute.post("/createCourse", auth, isInstructor, createCourse);
courseRoute.post("/editCourse", auth, isInstructor, editCourse);
courseRoute.post("/deleteCourse", auth, isInstructor, deleteCourse);
courseRoute.get("/allCourses", getAllCourse);
courseRoute.post("/getCourseDetails", auth, coursePurchased, getCourseDetail);
courseRoute.post("/getSubSectionDetails", auth, getSubSectionDetails);
courseRoute.post("/getInstructorCourses", auth, getInstructorCourses);
// courseRoute.post("/courseDetails", getCourseDetail);

//section
courseRoute.post("/createSection", auth, isInstructor, createSection);
courseRoute.post("/editSection", auth, isInstructor, updateSection);
courseRoute.delete("/deleteSection", auth, isInstructor, deleteSection);


//sub section
courseRoute.post("/createSubSection", auth, isInstructor, createSubsection);
courseRoute.post("/editSubSection", auth, isInstructor, updateSubsection);

//Rating and Reviews
courseRoute.post("/courseRating", auth, createRating);
courseRoute.post("/getAverageRating", auth, getAverageRating);
courseRoute.get("/getAllReview", getAllRatingAndReview);

module.exports = courseRoute;