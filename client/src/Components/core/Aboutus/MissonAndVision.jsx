import React from 'react'

const MissonAndVision = () => {
  return (
    <div className='bg-richblack-900 flex  text-gray-500 px-48 pt-40 justify-between pb-20    '>
        <div className="w-[50%]">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text">
            Our Vision
          </h1>
          <div className="flex flex-col gap-2 w-[70%] text-sm mt-5">
            <p>
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
        </div>
        <div className="w-[50%]">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1FA2FF] to-[#A6FFCB] text-transparent bg-clip-text">
            Our Mission
          </h1>
          <div className="flex flex-col gap-2 w-[70%] text-sm mt-5">
            <p>
              our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
    </div>
  )
}

export default MissonAndVision