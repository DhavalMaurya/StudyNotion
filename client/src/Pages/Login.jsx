import React, { useState } from "react";
import Frame from "../assets/frame.png";
import login from "../assets/login.png";
import { logIn } from "../service/operations/authAPI";
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";

const Login = () => {

  // const [currentTab, setCurrentTab] = useState("Student");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData , setFormDate] = useState({
    email : "",
    password : "",
  })

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    // console.log(formData)
    const {email ,password} = formData
    dispatch(logIn(email ,password ,navigate))
  }
  
  const handleOnchange = (e) => {
    setFormDate((prev)=> ({
      ...prev ,[e.target.name] : e.target.value
    }))
  }
  
  
  // const changeTab = (element) => {
  //   setCurrentTab(element);
  // };



  return (
    <div className="text-gray-500 font-bold px-28 pt-16 flex justify-between h-fit bg-richblack-900">
      <div className="w-[36%] flex flex-col gap-4 overflow-hidden">
        <p className="text-white text-3xl">Welcome Back </p>
        <p>
          Build skills for today, tomorrow, and beyond. Education to
          future-proof your career.
        </p>
        <form className="flex flex-col gap-3 mt-7 px-3" onSubmit={handleOnSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Email Address <span className="text-red-700">*</span>
            </label>
            <input
              type="email"
              name = "email"
              value={formData.email}
              onChange={handleOnchange}
              className="bg-richblack-800 w-full p-2 border-transparent rounded-lg"
              placeholder="Enter email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm ">
              Password <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              name = "password"
              value={formData.password}
              onChange={handleOnchange}
              className="bg-richblack-800 p-2 w-full border-transparent rounded-lg"
              placeholder="Enter password"
            />
          </div>
          <div className="flex w-full px-2 mt-4">
            <button className="text-black w-full bg-yellow-50 px-5 py-3 border-transparent rounded-xl">
              Login
            </button>
          </div>
          <div className="text-[12px] text-right text-blue-500 cursor-pointer px-5">
            <Link to={"/reset-password"}>If you forgot password , then click here</Link>
          </div>
        </form>
      </div>
      <div className="relative mt-16">
        <img src={Frame} alt="" />
        <img src={login} alt="" className="absolute right-4 -top-4" />
      </div>
    </div>
  );
};

export default Login;




