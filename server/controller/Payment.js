// RazorPay

// const { instance } = require('../config/razorpay');
// const mailSender = require('../utils/mailSender')
// const Course = require('../models/Course');
// const User = require('../models/User');
// const { default: mongoose } = require('mongoose');


// //capture payment and initiate the order
// exports.capturePayment = async (req, res) => {
//     //get CourseId and userId
//     const { course_id } = req.body;
//     const userId = req.user.id;

//     //validation
//     if (!course_id) {
//         return res.status(400).json({ success: false, message: "Please provide course" });
//     }

//     //valid courseDetail
//     let course = await Course.findById(course_id);
//     try {
//         if (!course) {
//             return res.status(400).json({ success: false, message: "Could not find the course" });
//         }
//         // chek if user alredy enrolled
//         const uid = new mongoose.Types.ObjectId(userId); // convert the userId from string to ObjectId 
//         if (course.studentsEnrolled.includes(uid)) {
//             return res.status(400).json({ success: false, message: "You have already enrolled" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, message: error.message, });
//     }

//     //create order
//     const amount = course.price;
//     const currency = "INR";

//     const option = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes: {
//             courseId: course_id,
//             userId,
//         }
//     };

//     try {
//         const paymentResponse = await instance.orders.create(option);
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success: true,
//             courseName: course.name,
//             courseDescription: course.description,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, message: error.message, });
//     }


// }

// //Verify signture of razorpay and server
// exports.verifySignature = async (req, res) => {
//     // create webhook secret 
//     const webhookSecret = '12345';

//     //fetch signature from razorpay
//     const signature = req.headers['x-razorpay-signature'];

//     //hash our webhook secerate by sha256 algo for comparing it signature for authorised payment
//     const shasum = crypto.cetateHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     // compare 
//     if (signature === digest) {
//         console.log("Payment is authorised");
//         const { userId, courseId } = req.body.payload.payment.entity.notes;

//         try {
//             // update Course model by adding new student in it  
//             const enrolledCourse = Course.findByIdAndUpdate({ _id: courseId }, {
//                 $push: { studentsEnrolled: userId }
//             }, { new: true })

//             if (!enrolledCourse) {
//                 return res.status(500).json({ success: false, message: "Course not found" });
//             }
//             console.log(enrolledCourse);

//             // update Student model by adding new course in enroll courses
//             const enrolledStudent = await User.findByIdAndUpdate({ _id: userId }, {
//                 $push: { course: courseId }
//             }, { new: true });

//             if (!enrolledStudent) {
//                 return res.status(500).json({ success: false, message: "User not found" });
//             }
//             console.log(enrolledStudent);

//             //send confirmation mail
//             const emailResponse = await mailSender(enrolledStudent.email ,"Conratulation by StudyNotaion" ,"Congrats for enrolled in our course" );
//             console.log(emailResponse);

//             // return response
//             return res.status(200).json({success : true ,message : "Signature verified and course added"})

//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({ success: false, message: error.message, });
//         }
//     }
//     else {
//         console.log("Payment is not authorised");
//         return res.status(400).json({ success: false, message: "Invalid request" });
//     }
// }


// Stripe payment integration

const stripe = require('stripe')('sk_test_51QFIETFy1VB27UwY0srdMzpBGBo2Q7VVdlUcTlkXpfobKZaBcaSoAC0uuASrDmCJ4tXP0GG3lCjr7GjHn1nUnA6900rtPdFS64');
const Course = require('../models/Course');
const User = require('../models/User')


// exports.coursePurchased = async (req ,res ,next) => {
//     const {userId} = req.body;
//     try {
//          // get user to check for course is not already purchased
//          const userCourses = await User.findById({userId}).select('course')
//         console.log("hello ham yaha haaaaaaaaaaa")
//          if(!userCourses){
//             return res.status(404).json({success : false , message : "User not found"})
//          }
         
//          // check if user already purchased course
//          const hasPurchased = userCourses.course.includes(courseId)
//          if(hasPurchased){
//              return res.status(400).json({success : false , message : "Course is already purchased" });
//          }
//          else{
//             next()
//          }
//     } catch (error) {
//         return res.status(400).json({success : false , message : "something went wrong while checking course" });
//     }
// }

exports.stripePayment = async (req, res) => {
    const { product, token, courseId, userId } = req.body;
    console.log("id :", token)
    try {

       
        
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.amount * 100, // Amount in cents
            currency: 'INR',
            payment_method_data: {
                type: 'card',
                card: {
                    token: token.id, // Use the token received from the client
                },
            },
            confirm: true, // Automatically confirm the payment
            return_url: 'http://localhost:3000/dashboard/enrolled-courses',
        });
        console.log("PaymentIntent created:", paymentIntent);


        if (paymentIntent.status === 'succeeded') {
            //add course to users enrolled course
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $push: { course: courseId }
            }, { new: true });

            const updatedCourse = await Course.findByIdAndUpdate(courseId, {
                $push: {
                    studentsEnrolled: userId
                }
            }, { new: true });

            res.status(200).json({success : true , message : "Thank you for buying the course" , paymentIntent });
        }
        else {
            console.log("Something went wrong")
        }
        // }

    } catch (error) {
        console.error("Error creating payment:", error);
        res.status(500).json({ error: error.message });
    }
}


