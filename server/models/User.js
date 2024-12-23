const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    accountType : {
        type : String,
        enum : ["Admin" ,"Student","Instructor"],
        required : true
    },
    additionalDetail : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Profile"
    },
    course :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Course",
        default : []
    }],
    image : {
        type : String,
    },
    token : {
        type :String
    },
    resetPasswordExpires : {
        type :Date,
    },
    courseProgress :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "CourseProgress",
        default : [],
    }]
})

module.exports = mongoose.model("User" , UserSchema);