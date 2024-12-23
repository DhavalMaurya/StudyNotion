const jwt = require('jsonwebtoken')
require('dotenv').config();

const User = require('../models/User');

//auth
exports.auth = async (req, res, next) => {
    const token = req.cookies.token || req.body.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", "").trim());
    try {

        //if token missing
        if (!token) {
            return res.status(401).json({ success: false, messaage: "token missing" })
        }

        //verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({ success: false, message: "token is invalid" });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false, message: "Something went wrong while validating the token",token
        });
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({ success: false, message: "This is protected route forr student only" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "user role cannot be verify , please try again" })
    }
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({ success: false, message: "This is protected route for instructor only" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "user role cannot be verify , please try again" })
    }
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({ success: false, message: "This is protected route for admin only" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "user role cannot be verify , please try again" })
    }
}