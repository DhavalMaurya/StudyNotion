const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const passwordResetTemp = require('../template/passwordResetTemp')

exports.resetPasswordToken = async (req, res, next) => {
    try {

        //fetch email from body
        const { email } = req.body;

        // check user for this email , email validation
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "Your email is not registered with us" , })
        }

        //generate token
        const token = crypto.randomUUID();  

        //update user by adding token and expire time 
        const updateDetails = await User.findOneAndUpdate({ email: email }, { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 }, { new: true })

        //create url
        const url = `http://localhost:3000/choose-password/${token}`;
        const body = passwordResetTemp(url)

        //send mail contaning the url
        await mailSender(email, "Password reset", body);

        //return response
        return res.json({ success: true, message: "Email sent successfully , please check email and change password",token ,email : email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
            //fetch data from body
            const { password, confirmPassword, token } = req.body;

            //validation
            if (password !== confirmPassword) {
                return res.status(401).json({ success: false, message: "Password and confirm password not match" })
            }

            //get userdetails from db using token
            const userDetail = await User.findOne({ token: token });

            //if no entry - invalid token
            if (!userDetail) {
                return res.status(401).json({ success: false, message: "Invalid token" })
            }

            //token time check
            if (Date.now() > userDetail.resetPasswordExpires) {
                return res.status(401).json({ message: "token expire , please regenerate it" })
            }

            //hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            //password update
            const updatedUser = await User.findByIdAndUpdate({_id :  userDetail._id }, { password: hashedPassword }, { new: true });

            //response return
            return res.status(200).json({ success: true, message: "Password reset successfully" });


        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Something went wrong" ,error});
        }
}   
