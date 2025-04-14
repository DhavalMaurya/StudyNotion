import React, { useState } from "react";
import Frame from "../assets/frame.png";
import login from "../assets/login.png";
import { logIn } from "../service/operations/authAPI";
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import InputField from "../Components/InputField";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData , setFormDate] = useState({
    email : "",
    password : "",
  })
  const {email ,password} = formData

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    // console.log(formData)
    dispatch(logIn(email ,password ,navigate))
  }
  
  const handleOnChange = (e) => {
    setFormDate((prev)=> ({
      ...prev ,[e.target.name] : e.target.value
    }))
  }
  



  return (
    <div className="text-gray-500 font-bold px-3 pb-10 md:px-18 lg:px-28 pt-16 flex gap-20 justify-between bg-richblack-900">
      <div className="flex flex-col gap-4 overflow-hidden px-7">
        <p className="text-white text-xl sm:text-2xl md:text-3xl">Welcome Back </p>
        <p className="text-xs md:text-base">
          Build skills for today, tomorrow, and beyond. Education to
          future-proof your career.
        </p>
        <form className="flex flex-col gap-3 mt-7 px-3" onSubmit={handleOnSubmit}>
        <InputField label={"Email Address"} type={"email"} placeholder={"Enter email "} value={email} changeFunc={handleOnChange} name={"email"}/>
          <InputField label={"Create Password"} type={"password"} placeholder={"Enter password "} value={password} changeFunc={handleOnChange} name={"password"}/>

          <div className="flex w-full px-2 mt-4">
            <button className="text-black w-full bg-yellow-50 px-5 py-3 border-transparent rounded-xl">
              Login
            </button>
          </div>
        </form>
          <div className="text-center w-full text-blue-500 cursor-pointer px-5 text-[10px] sm:text-base">
            <Link to={"/reset-password"}>If you forgot password , then click here</Link>
          </div>
      </div>
      <div className="relative mt-16 hidden lg:block">
        <img src={Frame} alt="" />
        <img src={login} alt="" className="absolute right-4 -top-4" />
      </div>
    </div>
  );
};

export default Login;




