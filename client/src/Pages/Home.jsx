import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import banner from "../assets/video/baner.mp4";

import HighlitedText from "../Components/core/Home/HighlitedText";
import Button from "../Components/core/Home/button";
import CodeBlock from "../Components/core/Home/CodeBlock";
import Timeline from "../Components/core/Home/Timeline";
import LearnLanguage from "../Components/core/Home/LearnLanguage";
import InstructorSection from "../Components/core/Home/InstructorSection";
import CardSection from "../Components/core/Home/CardSection";
import Footer from "../Components/Footer";
import { getAllRatingReview } from "../service/operations/courseAPI";
import Reviewswiper from "../Components/CourseDetails/Reviewswiper";

export const Home = () => {
  const [allReview, setAllReview] = useState([]);

  const getAllReviews = async () => {
    try {
      const result = await getAllRatingReview();
      console.log(result);
      setAllReview(result.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div>
      {/* Section - 1 */}
      <div className="Section-1 bg-richblack-900 text-[#999DAA] h-fit">
        <div className="flex justify-center flex-col items-center">
          <div className=" cursor-pointer hover:bg-richblack-900 w-fit bg-richblack-800 mt-20 px-4 py-2 border-transparent shadow-sm shadow-richblack-5 rounded-full  font-bold flex items-center gap-2 hover:scale-95 transition-all duration-200">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>

          <div className="Heading px-10 text-white mt-7  text-4xl font-semibold flex flex-wrap items-center justify-center gap-2  max-lg:text-3xl max-md:text-2xl max-sm:text-xl">
            Empower Your Future With{" "}
            <HighlitedText> Coding Skills</HighlitedText>
          </div>

          <div className="w-[55%] text-center mt-5 max-md:text- max-md:w-fit max-md:px-10 max-md:text-sm">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>

          <div className="flex gap-6 mt-10">
            <Button active={true}>Learn More</Button>
            <Button active={false}>Book a Demo</Button>
          </div>

          <div className="hover:scale-105 transition-all duration-500 BanerVideo flex justify-center w-[60%] mt-14 mb-7 shadow-2xl  shadow-blue-300">
            <video loop autoPlay muted src={banner}></video>
          </div>

          <div className="CodeBlock w-full px-52 max-lg:px-40 max-md:px-10 max-sm:px-3 ">
            <CodeBlock
              heading={
                <div>
                  Unlock your <HighlitedText>coding potential</HighlitedText>{" "}
                  with our online courses.
                </div>
              }
              subHeading={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`}
              button1={{
                text: (
                  <div className="flex gap-2 justify-center items-center">
                    Try it Yourself <FaArrowRight />{" "}
                  </div>
                ),
                active: true,
              }}
              button2={{ text: "Learn more", active: false }}
              code={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">/head>\n<body>\n<h1><a href="/">Header</a>/h1>\n<nav><a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
            />
          </div>
          <div className="CodeBlock w-full px-52 mb-20 max-md:px-10 max-sm:px-3  ">
            <CodeBlock
              position={"flex-row-reverse"}
              heading={
                <div>
                  Start <HighlitedText>coding</HighlitedText>{" "}
                  <div>
                    <HighlitedText>In Seconds</HighlitedText>
                  </div>
                </div>
              }
              subHeading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
              button1={{
                text: (
                  <div className="flex gap-2 justify-center items-center">
                    Continue Lesson <FaArrowRight />{" "}
                  </div>
                ),
                active: true,
              }}
              button2={{ text: "Learn more", active: false }}
              code={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">/head>\n<body>\n<h1><a href="/">Header</a>/h1>\n<nav><a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
            />
          </div>

          <div className="CardsSection">
            <CardSection />
          </div>

          <div className="homepage_bg w-full h-64 flex justify-center items-center flex-col">
            <div className="flex gap-4">
              <Button active={true}>
                <div className="flex gap-2 justify-center items-center">
                  Explore Full Catelog <FaArrowRight />
                </div>
              </Button>
              <Button active={false}>Learn More </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section -2  */}
      <div className="flex flex-col pt-24 px-24 max-md:px-10 bg-gray-100 max-lg:px-5 ">
        <div className="flex max-md:flex-col max-md:gap-5 max-lg:gap-5">
          <div className="Left text-4xl w-[50%] font-semibold max-md:w-full max-md:text-3xl">
            Get the skills you need for a <HighlitedText>Job</HighlitedText>{" "}
            <HighlitedText> that is in demand.</HighlitedText>
          </div>
          <div className="Right text-sm w-[50%] max-md:w-full ">
            <div className="w-[90%] mb-10 leading-6 tracking-wider">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </div>
            <Button active={true}>Learn More</Button>
          </div>
        </div>

        <Timeline />
        <LearnLanguage />
      </div>

      {/* Section -3 */}
      <div className="bg-richblack-900 text-white p-10">
        <InstructorSection />
        <div className="">
        <h1 className="text-5xl font-bold text-center mb-10 mt-8">
             <HighlitedText>Reviews from other Learner</HighlitedText>
          </h1>
          <Reviewswiper ratingAndReviews={allReview} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
