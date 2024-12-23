const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema({
    gender : {
        type : String,
    },
    dob : {
        type : String,
    },
    about : {
        type : String,
    },
    contactNumber : {
        type : Number,
    }
})

module.exports = mongoose.model("Profile" , ProfileSchema);