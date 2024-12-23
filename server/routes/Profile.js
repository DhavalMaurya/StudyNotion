const express = require('express')
const profileRoute = express.Router();

const { updateProfile, deleteAccount, getUserDetails ,getEnrolledCourses} = require('../controller/Profile');
const { resetPasswordToken, resetPassword } = require('../controller/ResetPassword');

const { auth } = require('../middlewares/auth');

profileRoute.post("/update", auth , updateProfile);
profileRoute.post("/delete", auth , deleteAccount);
profileRoute.get("/userDetails", auth , getUserDetails);
profileRoute.post("/enrolled-course", auth , getEnrolledCourses);
profileRoute.post("/resetPasswordTokenGenrator",resetPasswordToken);
profileRoute.post("/resetPassword",resetPassword);


module.exports = profileRoute;