import React from 'react'
import HighlitedText from './HighlitedText'
import image1 from '../../../assets/learnLanguage/image1.png'
import image2 from '../../../assets/learnLanguage/image2.png'
import image3 from '../../../assets/learnLanguage/image3.png'
import Button from './button'

const LearnLanguage = () => {
  return (
    <div className='mt-20'>
        <div className='flex flex-col justify-center items-center '>
            <div className='text-4xl font-bold max-md:text-3xl text-center'>Your swiss knife for <HighlitedText>learning any language</HighlitedText></div>
            <div className='text-sm w-[50%] text-center max-md:w-fit'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>
        </div>
        <div className='flex justify-evenly mt-10 max-md:flex-col max-md:justify-center max-md:items-center max-md:scale-90'>
            <img src={image1} alt="" className='w-[28rem] h-[28rem] hover:scale-105 transition-all duration-500'/>
            <img src={image3} alt="" className='w-[29rem] h-[32rem] -ml-64 -mt-7 hover:scale-105 transition-all duration-500 max-md:ml-0' />
            <img src={image2} alt="" className='w-[30rem] h-[29rem] -ml-72 hover:scale-105 transition-all duration-500 max-md:ml-0' />
        </div>
        <div className='text-center mt-20 mb-10'>
            <Button active={true}>Learn More</Button>
        </div>
    </div>
  )
}

export default LearnLanguage