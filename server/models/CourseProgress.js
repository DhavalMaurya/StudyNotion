const mongoose = require('mongoose')

const CourseProgress = mongoose.model({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required: true
    },
    completeVideo :[ {
        type:mongoose.Schema.Types.ObjectId,
        ref : "SubSection",
        require : true
    }]
})

module.exports = mongoose.model("CourseProgress",CourseProgress);