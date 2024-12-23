import React from 'react'
import Instrucot from '../../../assets/Instructor.jpeg'
import HighlitedText from './HighlitedText'
import Button from './button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='flex gap-5 py-10 px-16 h-fit w-fit max-md:flex-col max-md:justify-center max-md:items-center max-sm:px-5'>
        <div className='w-[60%] bg-white '>
            <img src={Instrucot} alt="" className='-mr-32'/>
        </div>
        <div className='flex flex-col justify-center items-start gap-5 px-20 max-sm:px-5 max-sm:w-fit'> 
            <div className='text-4xl font-bold max-md:text-3xl'>Become an {" "}<HighlitedText>instructor</HighlitedText> </div>
            <div className='mb-10'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
            <Button active={true}><div className='flex justify-center items-center gap-2'>Start Teaching Today <FaArrowRight /></div> </Button>
        </div>
    </div>
  )
}

export default InstructorSection