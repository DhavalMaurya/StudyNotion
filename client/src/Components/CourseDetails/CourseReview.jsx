import React from "react";
import Rating from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";

const CourseReview = ({ratingAndReview}) => {
  return (
    <div className="Review  w-[300px] px-5 py-3 flex flex-col justify-start gap-5 bg-richblack-800">
      <div className="User flex pt-4 gap-2">
        <div className="">
          <img
            className="border-transparent rounded-full w-10 h-10 "
            src = {ratingAndReview.user.image}
            alt="image not found"
          />
        </div>
        <div className="flex flex-col text-sm">
          <span>{ratingAndReview?.user.firstName} {ratingAndReview?.user.lastName}</span>
          <span className="text-richblack-200">{ratingAndReview?.user.email}</span>
        </div>
      </div>
      <div className="text-sm">
      {ratingAndReview?.review}
      </div>
      <div>
        <Rating
          classNames="cursor-pointer"
          count={5}
          size={20}
          value={ratingAndReview?.rating}
          isHalf={false}
          edit={false}
          activeColor="#ffd700"
          char={<FaStar/>}
        //   onChange={changeRating}
        />
      </div>
    </div>
  );
};

export default CourseReview;
