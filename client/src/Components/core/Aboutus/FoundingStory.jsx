import React from 'react'
import image4 from '../../../assets/aboutus4.jpeg'

const FoundingStory = () => {
  return (
    <div className="flex justify-evenly bg-richblack-900 text-gray-500 px-48 border-t-[1px] border-gray-800 pt-20">
        <div className="left w-[50%]">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text">
            Our Founding Story
          </h1>
          <div className="flex flex-col gap-2 w-[70%] text-sm mt-5">
            <p>
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p>
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
        </div>
        <div className="Right w-[50%]  pt-10 flex ">
          <img src={image4} alt="" className="w-[90%] pb-5 h-64" />
        </div>
      </div>
  )
}

export default FoundingStory