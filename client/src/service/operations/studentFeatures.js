// function loadScript(src) {
//     return new Promise((resolve, reject) => {
//         const script = document.createElement("script");
//         script.src = src

//         script.onload = ()=> {
//             resolve(true)
//         }

//         script.onerror = () => {
//             resolve(false)
//         }
//         document.body.appendChild(script);
//     })
// }

// export const buyCourse = async (token, courses, userDetails, navigate, dispatch,)=> {

//     const toastId = toast.loading("Loading...");

//     try {
//         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//         if (!res) {
//             toast.error("RazorPay SDK failed to load");
//             return;
//         }

//         const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
//                                                     {courses},
//                                                     {  
//                                                         Authorization: `Bearer ${token}`
//                                                     })

//         if(!orderResponse.data.success){
//             throw new Error(orderResponse.data.message)
//         }

//         console.log("Order Initialized, printing order response", orderResponse);

//         const options = {
//             key: process.env.RAZORPAY_KEY,
//             currency: orderResponse.data.message.currency,
//             amount: `${orderResponse.data.message.amount}`,
//             order_id:orderResponse.data.message.id,
//             name:"StudyNotion",
//             description: "Thank You for Purchasing the Course",
//             image:rzpLogo,
//             prefill: {
//                 name:`${userDetails.firstName}`,
//                 email:userDetails.email
//             },
//             handler: (response)=> {
//                 sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token)

//                 verifyPayment({...response, courses}, token, navigate, dispatch)
//             }  
//         }

//         // Open the modal using options, as order is initialized => payment will be done =>  Payment done mail => verificationPayment => course successfully enrolled mail sent
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//         paymentObject.on("payment.failed", (response)=> {
//             toast.error("oops, payment failed");
//             console.log(response.error);
//         })
//     } catch (error) {
//         console.log("PAYMENT API ERROR.....", error);
//         toast.error("Could not make Payment");
//     }

//     toast.dismiss(toastId)
// }


import { apiConnector } from '../apiconnector'
import { paymnet } from '../apis'
import { toast } from 'react-hot-toast'


export const buyCourse = async (token, amount, name, courseId, userId) => {
    const toastId = toast.loading("Loading")

    try {
        const body = JSON.stringify({
            product: {
                amount: amount,
                name: name,
            },
            token,
            courseId,
            userId,
        })

        const response = await apiConnector("POST", paymnet.GET_PAYMENT_API, body, {
            "Content-Type": "application/json",
        })
        console.log("Response from api " ,response);
        // if (response.success) {
        //     throw new Error("Error , something went wrong while purchasing course")
        // }
        toast.success(response.message)
        return response;
    } catch (error) {
        console.log("PAYMENT API ERROR............", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
}