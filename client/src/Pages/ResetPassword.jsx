import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordToken } from "../service/operations/authAPI";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, navigate));
  };

  return (
    <div className="text-white flex justify-center items-center h-[80%]">
      <div className=" flex justify-center gap-4 flex-col">
        <p className="text-3xl font-bold">Reset Password</p>
        <p className="w-96 text-gray-500">
          Have no fear. We’ll email you instructions to reset your password. If
          you dont have access to your email we can try account recovery{" "}
        </p>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-3">
          <label className="text-sm">
            Email Address <span className="text-red-700">*</span>
          </label>
          <input
            type="email"
            className="bg-richblack-800 w-full p-2 border-transparent rounded-lg"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button className="bg-yellow-50 px-5 text-center py-2 text-black w-full font-bold">
            Send Mail
          </button>
        </form>
        <div className="flex justify-between px-1 text-sm mt-0">
          <span className="text-blue-400">
            <Link className="flex gap-2 items-center cursor-pointer" to={'/login'}>
              <FaLongArrowAltLeft /> Back to login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
