import React, { useEffect, useState } from "react";
import { MdOutlineInfo } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import CourseContent from "../Components/CourseDetails/CourseContent";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import {
  getCourseDetails,
  getAvgRating,
} from "../service/operations/courseAPI";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmationModal from "../Components/ConfirmationModal";

import StripeCheckout from "react-stripe-checkout";
import { buyCourse } from "../service/operations/studentFeatures";
import Rating from "react-rating-stars-component";
import Reviewswiper from "../Components/CourseDetails/Reviewswiper";
import toast from "react-hot-toast";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [courseDetails, setCourseDetails] = useState({});
  const [modalData, setModalData] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { coursePurchased } = useSelector((state) => state.course);
  const [avgRating, setAvgRating] = useState(0);

  const buyNow = async (token) => {
    const response = await buyCourse(
      token,
      courseDetails.price,
      courseDetails.name,
      courseDetails._id,
      user._id
    );

    // Check paymentIntent status and redirect
    if (response.data.paymentIntent.status === "succeeded") {
      window.location.href = "http://localhost:3000/dashboard/enrolled-courses";
      console.log("Success");
      // Handle error
    } else {
      console.error("Payment error:");
    }
  };

  //function to fetch full course details
  const fetchCourseDetails = async () => {
    const result = await getCourseDetails(courseId, token, dispatch);
    console.log("courseDetails", result);
    setCourseDetails(result);
  };

  //function to fromat string
  const sentenceSpliter = (text = "", wordcount) => {
    return text.split(" ").slice(0, wordcount).join(" ");
  };

  // function to format date
  const formatDate = (dateString) => {
    // Parse the ISO date string to a Date object
    const date = new Date(dateString);

    // Get the formatted date
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Get the formatted time
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Combine date and time with custom text
    return `Created at ${formattedDate} | ${formattedTime}`;
  };

  //function to get avg rating
  const getAverageRating = async () => {
    const response = await getAvgRating(courseId, token);
    // console.log("average rating", response);
    setAvgRating(response.data.averageRating);
  };

  const removeExcessEscaping = (data) => {
    // Step 1: Remove leading and trailing quotes if present
    if (data?.startsWith('"') && data.endsWith('"')) {
      data = data.slice(1, -1);
    }

    // Step 2: Remove triple or more backslashes
    data = data?.replace(/\\{2,}/g, "\\");

    // Step 3: Replace \" with "
    data = data?.replace(/\\"/g, '"');

    // Step 4: Replace \n with actual newlines
    data = data?.replace(/\\n/g, "<br />");

    // Step 5: Remove any additional leading or trailing quotes that remain
    data = data?.replace(/^"+|"+$/g, "");

    return data;
  }

  const addToCart = () => {
    return toast.success("This feature is comming soon")
  }



  useEffect(() => {
    fetchCourseDetails();
    getAverageRating();
  },[]);

  useEffect(() => {
    console.log("Average Rating:", avgRating); // This will check if avgRating is being updated
  }, [getAverageRating]);

  return (
    <div className="text-richblack-5 h-fit overflow-auto bg-richblack-900 ">
      <div className="relative flex justify-between bg-richblack-800 p-28 z-0">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-bold">{courseDetails.name}</h1>
          <div className="text-sm text-richblack-200 w-[50%]">
            {sentenceSpliter(courseDetails.description, 40)}...
          </div>
          <div className="text-yellow-50 flex gap-2 items-center text-lg">
            <span className="text-lg text-yellow-5">{avgRating}</span>
            {avgRating ? (
              <Rating
                classNames="cursor-pointer"
                count={5}
                size={20}
                value={isNaN(avgRating) ? 0 : avgRating} // Ensure it's a valid number
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
                // char={<FaStar />}
              />
            ) : (
              ""
            )}
            <span className="text-base text-richblack-5">({courseDetails.ratingAndReviews?.length} reviews)</span>
            <span className=" text-base text-richblack-5">
              {/* {courseDetails.studentsEnrolled.length > 0 ? "" : ""} Enrolled */}
            </span>
          </div>
          <span>
            Created by {courseDetails.instructor?.firstName}{" "}
            {courseDetails.instructor?.lastName}
          </span>
          <div className="flex justify-center items-center gap-2 w-fit">
            <MdOutlineInfo className="text-richblack-500" />{" "}
            <span>{formatDate(courseDetails.createdAt)}</span>
            <span className="flex gap-1 justify-center items-center">
              <MdOutlineLanguage />
              English
            </span>
          </div>
        </div>
        <div className="absolute right-28 top-20 bg-richblack-700 w-[28%] p-8  border border-transparent rounded-lg flex flex-col gap-3">
          <div>
            <img
              src={courseDetails.thumbnail}
              alt="Course image"
              className="w-full  border border-transparent rounded-lg"
            />
          </div>
          <span className="text-3xl font-bold">Rs. {courseDetails.price}</span>
          <div className="flex flex-col gap-4">
            {coursePurchased ? (
              <Link to={`/view-course/${courseDetails._id}`}>
                <button className="py-2 text-black font-bold bg-yellow-50 w-full border border-transparent rounded-lg">
                  Watch Course
                </button>
              </Link>
            ) : (
              <StripeCheckout
                stripeKey="pk_test_51QFIETFy1VB27UwY57FpCm76GlsnijPBnYQ91Y1LSkqMCQ5vHqN0qHzZSLA27Qa2f136wg498XlCFtAAGeHwQW1Q00lP07iju8"
                token={buyNow}
                name={courseDetails.name}
                amount={courseDetails.price * 100} // Amount in cents ($25.00)
                currency="INR"
              >
                <button className="py-2 text-black font-bold bg-yellow-50 w-full border border-transparent rounded-lg">
                  Buy Now
                </button>
              </StripeCheckout>
            )}

            <button  onClick={()=>{addToCart()}} className="py-2 bg-richblack-800 font-bold text-richblack-5 w-full  border border-transparent rounded-lg">
              Add to Cart
            </button>
          </div>
          <div className="text-center">
            <span>30-Day Money-Back Guarantee</span>
          </div>
          <div className="ContentInclude">
            <span className="text-xl font-bold">This Course include : </span>
            <ul>
              <li>Good course</li>
              <li>best preparation</li>
            </ul>
          </div>
          <div className="flex items-center gap-1 justify-center text-yellow-50">
            <FaShareSquare />
            <span>Share</span>
          </div>
        </div>
      </div>
      <div className="mx-28 mt-10 flex flex-col gap-5 h-fit">
        <div className="WhatYouLearn flex flex-col gap-3 border-[1px] border-richblack-700 p-6 w-[60%]">
          <h1 className="text-3xl font-bold">What you'll learn</h1>
          <div
            className="flex flex-col gap-1"
            dangerouslySetInnerHTML={{
              __html: removeExcessEscaping(courseDetails.whatYouLearn), // Using the cleaned data here
            }}
          ></div>
        </div>
        <div className="CourseContent h-fit flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Course Content</h1>
          <div className="flex gap-3">
            <span><span className="text-yellow-5">{courseDetails.courseContent?.length}</span> Section </span>
            {/* <span>2 Lectures(s)</span> */}
          </div>
          <div>
            <CourseContent courseContent={courseDetails.courseContent} />
            <CourseContent />
            <CourseContent />
          </div>
        </div>

        {/* Author Section */}
        <div className="Author flex flex-col gap-5 mt-3 mb-20">
          <h1 className="text-3xl font-bold">Author</h1>
          <div className="flex items-center gap-3 text-xl font-semibold">
            <img
              src="https://www.stryx.com/cdn/shop/articles/man-looking-attractive.jpg?v=1666662774"
              alt=""
              className="w-20 h-20 border-transparent rounded-full object-cover"
            />
            <span>Code With Harry</span>
          </div>
        </div>
        {/* Review Section */}
        <div className="flex justify-center flex-col">
          <h1 className="text-3xl font-bold text-center mb-4">
            Reviews from other learners
          </h1>
          <div className="Reviews mb-20 pt-5 text-richblack-25">
            <Reviewswiper ratingAndReviews={courseDetails.ratingAndReviews} />
          </div>
        </div>
      </div>

      <Footer />

      {modalData && <ConfirmationModal modalData={modalData} />}
    </div>
  );
};

export default CourseDetail;
