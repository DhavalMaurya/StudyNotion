const nodemailer = require('nodemailer')
require('dotenv').config();
const mailSender = async (email, title, body) => {
    try {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            throw new Error('Invalid email address');
        }
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        console.log(email , title , body)
        let info = await transporter.sendMail({
            from: `rihobo4614@padvn.com`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })

        console.log(info);
        return info;

    } catch (error) {
        console.log(error)
    }
}

module.exports = mailSender;