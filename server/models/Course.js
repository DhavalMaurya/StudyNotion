const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    whatYouLearn: {
        type: String,
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
    }],
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews",
    }],
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        require : true
    },
    Tags : [{
        type: String
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    studentsEnrolled:[ {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "User",
        default : []
    },],
    createdAt : {
        type : Date,
        default : Date.now
    },
    status : {
        type : String,
        enum : ["Draft" , "Publish"]
    }
})

module.exports = mongoose.model("Course" , CourseSchema);