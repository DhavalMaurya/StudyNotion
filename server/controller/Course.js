const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const Section = require('../models/Section');
require('dotenv').config();
const SubSection = require('../models/SubSection')

const imageUploader = require('../utils/imageUploader')

//create course
exports.createCourse = async (req, res) => {
    try {

        //fetch data
        const { name, description, whatYouLearn, price, category, tag } = req.body;
        const thumbnail = req.files.thumbnailImage

        //validation
        if (!name || !description || !whatYouLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({ message: 'All fields are require', success: false, body: req.body });
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetail = await User.findById({ _id: userId });
        console.log("instructor deatil : ", instructorDetail);
        if (!instructorDetail) {
            return res.status(404).json({ success: false, message: "Instructor deatil not found" });
        }

        //check given tag is valid
        const tagDetail = await Category.findById(category);
        if (!tagDetail) {
            return res.status(404).json({ success: false, message: "Tag deatil not found" });
        }

        //upload image to cloudinary
        const thumbnailImage = await imageUploader.mediaUploader(thumbnail, "studyNotion");

        //crate entry for new course
        const newCourse = await Course.create({
            name,
            description,
            instructor: instructorDetail._id,
            whatYouLearn,
            Tags: tag,
            thumbnail: thumbnailImage.secure_url,
            price,
            category: tagDetail._id,
        })

        //add new course to the user schema of instructor
        await User.findByIdAndUpdate({ _id: instructorDetail._id }, {
            $push: {
                course: newCourse._id,
            },
        }, { new: true })

        //update the Category schema
        await Category.findByIdAndUpdate({ _id: tagDetail._id }, {
            $push: {
                course: newCourse._id,
            },
        }, { new: true })

        //return response
        return res.status(200).json({
            success: true, message: "Course created successfully", thumbnailImage, data: newCourse,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed while creating course", error: error.message });
    }

}

exports.editCourse = async (req, res) => {
    try {

        //fetch data
        const { courseId, name, description, whatYouLearn, price, category, tag } = req.body;
        const thumbnail = req.files.thumbnailImage

        //validation
        if (!name || !description || !whatYouLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({ message: 'All fields are require', success: false, body: req.body });
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetail = await User.findById({ _id: userId });
        console.log("instructor deatil : ", instructorDetail);
        if (!instructorDetail) {
            return res.status(404).json({ success: false, message: "Instructor deatil not found" });
        }

        //check given tag is valid
        const tagDetail = await Category.findById(category);
        if (!tagDetail) {
            return res.status(404).json({ success: false, message: "Tag deatil not found" });
        }

        //upload image to cloudinary
        const thumbnailImage = await imageUploader.mediaUploader(thumbnail, "studyNotion");

        //crate entry for new course
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            name,
            description,
            instructor: instructorDetail._id,
            whatYouLearn,
            Tags: tag,
            thumbnail: thumbnailImage.secure_url,
            price,
            category: tagDetail._id,
        }, { new: true })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetail",
                },
            })
            .populate("category")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections",
                },
            })
            .exec()

        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: "something went wrong" })
        }

        //return response
        return res.status(200).json({
            success: true, message: "Course updated successfully", data: updatedCourse,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed while updating course", error: error.message });
    }

}

//get all course handler
exports.getAllCourse = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            name: true,
            price: true,
            thumnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true
        }, { new: true }).populate('instructor').exec();
        return res.status(200).json({ success: true, message: "All courses fetched successfully", data: allCourses })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed while getting courses", error: error.message });
    }
}

//get single course details
exports.getCourseDetail = async (req, res) => {
    try {
        //fetch course id
        const { courseId } = req.body
        const coursePurchased = req.coursePurchased

        //get details
        const courseDetail = await Course.findById(
            { _id: courseId })
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionalDetail",
                    }
                }
            )
            .populate("category")
            .populate({
                path : "ratingAndReviews",
                populate:{
                    path : "user",
                    select :"email firstName lastName image"
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections"
                },
            })
            .exec();
        //validation
        if (!courseDetail) {
            return res.status(400).json({ success: false, message: `Could not find the course with ${courseId}` });
        }

        //return response
        return res.status(200).json({ success: true, message: "Course details fetch successfully", data:courseDetail , coursePurchased })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: " Something went wrong while fetching course details" });
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.body.id;
        if (!instructorId) {
            return res.status(404).json({ message: "id missing", success: false })
        }
        const courses = await Course.find({ instructor: instructorId }).sort().populate({
            path: "courseContent",
            populate: {
                path: "subSections"
            }
        })
        return res.status(200).json({ success: true, message: "Courses fetch successfully", data: courses })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed while fetching instructor courses", error: error.message });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { course: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSections
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
      

      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
}