const mongoose = require('mongoose')

const RatingAndReviews = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        require: true
    },
    review: {
        type: String,
        require: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
})

module.exports = mongoose.model("RatingAndReviews", RatingAndReviews);