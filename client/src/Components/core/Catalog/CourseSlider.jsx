import React from "react";
import CourseCard from "./CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const CourseSlider = ({ heading, courses }) => {
  return (
    <div className="">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 0",
        }}
      >
        {courses.length > 0 &&
          courses.map((item) => (
            <SwiperSlide key={item._id} className="">
              <div className="mb-10">
                <CourseCard item={item} />
              </div>
            </SwiperSlide>
          ))}
        <div className="swiper-pagination mt-6"></div>
      </Swiper>
    </div>
  );
};

export default CourseSlider;
