import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { singUp } from "../service/operations/authAPI";
import { Link } from "react-router-dom";

const EmailVerification = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const {signupData} = useSelector((state)=> state.auth)
  const data = {...signupData , otp}

  const buttonClick = () => {
    console.log(otp);
  };
   
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(singUp(data , navigate));
  }

  return (
    <div className="text-white flex justify-center items-center h-[80%]">
      <div className="">
        <p className="text-3xl font-bold">Verify email</p>
        <p className="w-96 text-gray-500">
          A verification code has been sent to you. Enter the code below
        </p>
       <form onSubmit={handleOnSubmit}>
       <div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => (
              <input {...props} className="bg-richblack-700 m-6" />
            )}
          />
        </div>
        <button
          onClick={buttonClick}
          className="bg-yellow-50 px-5 text-center py-2 text-black w-full"
        >
          Verify and Register
        </button>
       </form>
        <div className="flex justify-between px-1 text-sm mt-2">
          <Link to={"/signup"}><span className="flex gap-2 items-center"><FaLongArrowAltLeft /> Back to Sign up</span></Link>
          <span>Resend it</span>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
