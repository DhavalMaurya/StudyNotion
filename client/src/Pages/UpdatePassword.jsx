import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../service/operations/authAPI";
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { id } = useParams();
  const token = id.trim();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      password,
      confirmPassword,
      token,
    };
    dispatch(resetPassword(data, navigate));
  };

  return (
    <div className="text-white flex justify-center items-center h-[80%]">
      <div className=" flex justify-center gap-4 flex-col">
        <p className="text-3xl font-bold">Choose new password</p>
        <p className="w-96 text-gray-500">
          Almost done. Enter your new password and youre all set.
        </p>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm">
              Password <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              className="bg-richblack-800 w-full p-2 border-transparent rounded-lg"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-sm">
              Confirm password <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              className="bg-richblack-800 w-full p-2 border-transparent rounded-lg"
              placeholder="Enter confirm password"
              name="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button className="bg-yellow-50 px-5 text-center py-2 text-black w-full font-bold">
            Submit
          </button>
        </form>
        <div className="flex justify-between px-1 text-sm mt-2">
          <span className="flex gap-2 items-center cursor-pointer">
            <FaLongArrowAltLeft /> Back to login
          </span>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
