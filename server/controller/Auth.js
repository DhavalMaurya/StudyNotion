const User = require('../models/User')
const Profile = require('../models/Profile');
const Otp = require('../models/Otp')

const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
// const otpTemp = require("../utils/mailTemplates")


exports.sendOTP = async (req, res) => {

    try {
        //fetch email from body
        const { email } = req.body;

        // check if user already exist
        const userExist = await User.findOne({ email });

        //if User exist
        if (userExist) {
            return res.status(401).json({ success: false, message: "User already exist" })
        }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log(otp);

        //Check otp is unique or not
        const result = await Otp.findOne({ otp: otp });
        while (result) {
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            console.log(otp);
            result = await Otp.findOne({ otp: otp });
        }

        //save otp in DB
        const title = "Your OTP Code for StudyNotion"
        const otpPayload = { email, title, otp };
        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody);

        //return response
        res.status(200).json({ success: true, message: "OTP sent successfully", otpBody })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }

}

exports.singUp = async (req, res) => {
    try {
        //fetch data from body
        const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body;

        //Validate
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({ success: false, message: "All fields are require" });
        }

        //Math passwor and confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Password and confirm password does not match" });
        }

        //check if user already exist 
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }

        //find most recent otp
        const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("recentOtp : ", recentOtp);
        console.log("OTP : ", otp);

        //validate otp
        if (recentOtp.length == 0) {
            return res.status(400).json({ success: false, message: "OTP not found" });
        }
        else if (otp !== recentOtp.otp) {
            return res.status(400).json({ sucess: false, message: "Invalid OTP", recentOtp });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //entery in DB
        const profileDetail = await Profile.create({
            gender: null,
            dob: null,
            about: null,
            contactNumber: null,

        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            additionalDetail: profileDetail._id,
            accountType: accountType,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        //return response
        return res.status(200).json({ success: true, message: "User is registered successfully", user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "User cannot be registered . please try again", error: error });
    }
}

exports.login = async (req, res) => {
    try {
        // fetch data from body
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(403).json({ success: false, message: "All fields required" })
        }

        //check user existence
        const userExist = await User.findOne({ email }).populate("additionalDetail");
        if (!userExist) {
            return res.status(401).json({ success: false, message: "User is not registered , please signup first" });
        }

        //compare password 
        if (await bcrypt.compare(password, userExist.password)) {
            //generate JWT token
            const playload = { email: email, id: userExist._id, accountType: userExist.accountType, }
            const token = jwt.sign(playload, process.env.JWT_SECRET, {
                expiresIn: "20h",
            })
            userExist.token = token;
            userExist.password = undefined;

            //generate cookie
            const options = {
                expires: new Date(Date.now() + 3 * 34 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                userExist,
                message: 'Logged in successfully',
            })
        }
        else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }


    } catch (error) {

    }

}

exports.changePassword = async (req, res) => {
    try {
        //fetch data from body
        const { email, oldPassword, newPassword, confirmPassword } = req.body;

        //validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(403).json({ success: false, message: "All fields required" })
        }

        //get user by email
        const user = await User.findOne({ email: email });

        //check old password and compare new password with confirm passoword 
        if (bcrypt.compare(oldPassword, user.password)) {
            if (newPassword === confirmPassword) {
                return res.status(401).json({ success: false, message: "password doesnot match" })
            }
            const updateUser = User.findOne({ email: email }, { password: hashedPassword }, { new: true });
        } else {
            return res.status(401).json({ success: false, message: "old password incoorect" })
        }
        return res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, messaage: "Something went wrong" });
    }
}