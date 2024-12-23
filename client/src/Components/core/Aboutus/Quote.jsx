import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import HighlitedText from '../Home/HighlitedText';
const Quote = () => {
  return (
    <div>
        <p className="text-center tracking-wide leading-10">
          <FaQuoteLeft className="inline-block m-3 -mt-3 text-gray-500" />
          We are passionate about revolutionizing the way we learn. Our
          innovative platform <HighlitedText>combines technology</HighlitedText>
          , <span className="text-orange-600">expertise</span>, and community to
          create an{" "}
          <span className="text-yellow-500">
            unparalleled educational experience
          </span>
          .<FaQuoteRight className="inline-block m-3 -mt-3 text-gray-500" />
        </p>
    </div>
  )
}

export default Quote