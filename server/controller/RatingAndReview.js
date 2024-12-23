const RatingAndReview = require('../models/RatingAndReviews');
const Course = require('../models/Course');
const RatingAndReviews = require('../models/RatingAndReviews');
const { default: mongoose } = require('mongoose');

//create Rating
exports.createRating = async (req, res) => {
    try {
        //fetch data
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        //check if user enroll or not
        console.log("courseId", courseId, "Student Id", userId)
        const courseDetail = await Course.findOne({ _id: courseId, studentsEnrolled: { $elemMatch: { $eq: userId } } })
        if (!courseDetail) {
            return res.status(404).json({ success: false, message: "Student is not enroll for this course " })
        }

        //check if user already reviewed this course
        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });
        if (alreadyReviewed) {
            return res.status(400).json({ success: false, message: "Course is already reviewed by the user" })
        }

        // create rating and reviews
        const ratingReview = await RatingAndReview.create({ rating, review, course: courseId, user: userId })

        //update in course model
        const updatedCOurse = await Course.findByIdAndUpdate({ _id: courseId }, { $push: { ratingAndReviews: ratingReview._id } }, { new: true })

        //return response
        return res.status(200).json({ success: true, messaage: "Rating and Review created successfully", ratingReview, updatedCOurse })
    } catch (error) {
        console.log(error); ''
        return res.status(400).json({ success: false, message: error.messaage });
    }
}

exports.getAverageRating = async (req, res) => {
    try {
        //get course Id
        const { courseId } = req.body;
        //calculate avg rating
        const result = await RatingAndReviews.aggregate([
            { $match: { course: new mongoose.Types.ObjectId(courseId) } },
            {
                $group: {
                    _id: "$course", averageRating: { $avg: "$rating" },
                }
            }
        ])

        //return rating
        if (result.length > 0) {
            return res.status(200).json({ success: true, averageRating: result[0].averageRating });
        }

        //if no rating review exist
        return res.status(200).json({ success: true, messaage: "rating is 0 , no rating given till now", averageRating: 0 })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

exports.getAllRatingAndReview = async (req, res) => {
    try {
        const allRatingAndReview = await RatingAndReview.find({}).sort({ rating: "desc" }).populate({ path: "user", select: "firstName lastName email image" }).populate({ path: "course", select: "name" }).exec();

        return res.status(200).json({ success: true, messaage: "all review fetch successfully", data: allRatingAndReview });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}