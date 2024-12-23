import React from 'react'

const HighlitedText = ({children}) => {
  return (
    <div className='inline-block bg-gradient-to-r from-[#1FA2FF] to-[#A6FFCB] text-transparent bg-clip-text'>
       {children}
    </div>
  )
}

export default HighlitedText