const express = require('express')
const {singUp ,login , changePassword ,sendOTP} = require('../controller/Auth');
const userRoute = express.Router();

userRoute.post("/singup" , singUp)
userRoute.post("/login" , login)
userRoute.post("/sendOtp" , sendOTP)
// userRoute.post("/resetPasswordTokenGenrator",resetPasswordToken);
module.exports = userRoute;