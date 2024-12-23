import React, { useState } from "react";
import Button from "../Home/button";
import Rating from "react-rating-stars-component";
import { createRating } from "../../../service/operations/courseAPI";
import { useSelector } from "react-redux";

const RatingModal = ({ cancleReviewModal , courseId}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const {token} = useSelector((state)=>state.auth)
  const {user} = useSelector((state)=>state.profile)

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  //Funtion to add review of user
  const addReview = async (rating, review) => {
    console.log(rating , review ,courseId ,token)
    try {
      const response = await createRating(rating, review, courseId, token);
      // console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg- bg-opacity-10 backdrop-blur-sm">
      <div className="w-[30%] text-richblack-25 ">
        <div className="Heading flex justify-between bg-richblack-700 px-5 py-3 ">
          <h1>Add Review</h1>
          <div
            onClick={() => {
              cancleReviewModal();
            }}
            className="cursor-pointer"
          >
            X
          </div>
        </div>
        <div className="Body bg-richblack-800 py-8 px-8 flex flex-col gap-5">
          <div className="User flex justify-center pt-4 gap-2">
            <div className="">
              <img
                className="border-transparent rounded-full w-10 h-10 "
                src= {user?.image}
                alt="not found"
              />
            </div>
            <div className="flex flex-col text-sm">
              <span> {user?.firstName} {user?.lastName}</span>
              <span>Posting publicly</span>
            </div>
          </div>
          <div className="flex justify-center">
            <Rating
              classNames="cursor-pointer"
              count={5}
              size={24}
              value={rating}
              isHalf={true}
              edit={true}
              activeColor="#ffd700"
              onChange={changeRating}
            />
          </div>
          <div className="Form ">
            <div className="Review flex flex-col gap-3">
              <label htmlFor="description" className="text-sm tracking-wide">
                Your review here
                <span className="text-red-700"> *</span>
              </label>
              <textarea
                value={review}
                onChange={(e) => {
                  setReview(e.target.value);
                }}
                name="description"
                id="description"
                placeholder="Enter your review about this course"
                className="bg-richblack-700 p-2 h-40 w-full border-transparent rounded-lg shadow-sm shadow-white"
              ></textarea>
            </div>
          </div>
          <div className="Submit flex justify-end gap-5">
            <Button active={false}>
              <span
                onClick={() => {
                  cancleReviewModal();
                }}
              >
                Cancel
              </span>
            </Button>
            <Button active={true}>
              <span
                onClick={() => {
                  addReview(rating ,review);
                  cancleReviewModal();
                }}
              >
                Submit Review
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
