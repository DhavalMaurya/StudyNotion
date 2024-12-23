import React, { useEffect, useState } from "react";
import Rating from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { getAvgRating } from "../../../service/operations/courseAPI";
import { useSelector } from "react-redux";
const CourseCard = ({ item }) => {
  const [avgRating, setAvgRating] = useState(0);
  const {token} = useSelector((state) => state.auth);

  const getAverageRating = async () => {
    const response = await getAvgRating(item._id, token);
    setAvgRating(response.data.averageRating);
  };

  useEffect(()=>{
    getAverageRating();
  },[])


  return (
    <div className="cursor-pointer">
      <Link to={`/courses/${item._id}`}>
        <div className="flex flex-col gap-5 justify-between items-center">
          <img
            className=" h-64 border-transparent rounded-xl"
            src={
              item.thumbnail
                ? item.thumbnail
                : "https://cdn.shopify.com/s/files/1/0306/6419/6141/articles/coding_languages.png?v=1619126283"
            }
            alt=""
          />
          <div className="w-full text-richblack-100 flex flex-col gap-2">
            <div className="mt-3 tracking-wider text-lg">{item.name}</div>
            {/* <div className="text-richblack-200 w-full">{item.description}</div> */}
            <div className="text-yellow-50 flex gap-2 items-center text-lg">
              <span className="text-yellow-50 text-lg">{avgRating}</span>
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
              <span className=" text-base">
                (Review {item.ratingAndReviews.length} )
              </span>
            </div>
            <div className=" tracking-widest text-xl">Rs.{item.price}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
