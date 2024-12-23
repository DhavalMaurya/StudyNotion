import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Navigation module
import "swiper/css";
import "swiper/css/navigation"; // Import Navigation styles
import CourseReview from "./CourseReview";

const Reviewswiper = ({ratingAndReviews}) => {
  return (
    <Swiper
      slidesPerView={4} // Number of slides per view
      spaceBetween={30} // Space between slides
      navigation // Enable navigation arrows
      centeredSlides={true} // Centers slides when fewer than `slidesPerView`
      loop={true} // Create continuous loop even with fewer slides
      modules={[Navigation]} // Add Navigation to modules
      className="mySwiper"
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {ratingAndReviews?.map((review, index) => (
        <SwiperSlide key={index}>
         <CourseReview ratingAndReview={review}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Reviewswiper;
