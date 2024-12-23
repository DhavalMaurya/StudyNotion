const User = require("../models/User");

exports.coursePurchased = async (req, res, next) => {
    const {id} = req.user;
    const {courseId} = req.body;
    try {
        // get user to check for course is not already purchased
        const userCourses = await User.findById({_id: id });
        if (!userCourses) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        // check if user already purchased course
        const hasPurchased = userCourses.course.includes(courseId)
        if (hasPurchased) {
            req.coursePurchased = true;
        }
        else {
            req.coursePurchased = false;
        }
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: "something went wrong while checking course",error });
    }
}