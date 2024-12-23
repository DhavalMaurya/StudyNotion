const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const mailTemplate = require('../template/vreficationTemp');

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        reuired: true
    },
    otp: {
        type: String,
        reuired: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
        required: true
    }
});

async function sendVerificationEmail(email, otp) {
    const body = mailTemplate(otp)
    try {
        const mailResponse = await mailSender(email, "Verification Email from Study Notion", body);
        console.log("mail send Successfully : ", mailResponse);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

OtpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email , this.otp);
    next();
})

module.exports = mongoose.model('Otp', OtpSchema);