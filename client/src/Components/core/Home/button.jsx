import React from 'react'

const Button = ({children ,active}) => {
  return (
    <button className={`w-fit h-fit px-4 py-2 border-transparent bg-richblack-800 rounded-xl font-semibold ${active ?"bg-yellow-50 text-black" : "bg-slate-900 text-white shadow-sm shadow-white"} hover:scale-95 transition-all duration-200`}>{children}</button>
  )
}

export default Button;