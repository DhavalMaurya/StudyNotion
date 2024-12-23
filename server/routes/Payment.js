// Import the required modules
const express = require("express")
const paymentRoutes = express.Router()
const { stripePayment } = require('../controller/Payment')
// const { capturePayment , verifySignature } = require("../controller/Payment") 

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
// router.post("/capturePayment", auth, isStudent, capturePayment)
// router.post("/verifyPayment",auth, isStudent, verifySignature)
// router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);
paymentRoutes.post("/stripePayment",stripePayment);

module.exports = paymentRoutes;