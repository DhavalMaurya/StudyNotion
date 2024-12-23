import React, {useState } from "react";
import Frame from "../assets/frame.png";
import Signup from "../assets/signup.png";
import { useDispatch} from "react-redux";
import { setSingupData } from "../redux/slices/authSlice";
import { sendOTP } from "../service/operations/authAPI";
import { useNavigate } from "react-router-dom";


const SignUp = () => {

  const navigate = useNavigate()

  //useDispatch is use to access the methods from slices
  const dispatch = useDispatch();

  //with useSelector we can access the vaule from slices
  // const { signupData } = useSelector((state) => state.auth);

  //use to set or switch account type
  const [accountType, setAccountType] = useState("Student");

  //use to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: accountType,
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(setSingupData(formData));
    dispatch(sendOTP(email , navigate))
  };

  const changeAccountType = (element) => {
    setAccountType(element);
    console.log("Account type",element);
    setFormData((prevFormData) => ({
      ...prevFormData,
      accountType: element, // Update accountType in formData when changed
    }));
  };

  return (
    <div className="text-gray-500 font-bold px-28 pt-16 flex justify-between bg-richblack-900">
      <div className="w-[36%] flex flex-col gap-3 overflow-hidden">
        <p className="text-white text-3xl">
          Join the millions learning to code with StudyNotion for free
        </p>
        <p>
          Build skills for today, tomorrow, and beyond. Education to
          future-proof your career.
        </p>
        <div className="bg-richblack-800 border-transparent rounded-3xl cursor-pointer flex gap-3 w-fit p-1">
          <span
            onClick={() => {
              changeAccountType("Student");
            }}
            className={`px-3 py-1 border-transparent rounded-3xl ${
              accountType === "Student" ? "bg-richblack-900 text-white" : ""
            }`}
          >
            Student
          </span>
          <span
            onClick={() => {
              changeAccountType("Instructor");
            }}
            className={` px-3 py-1 border-transparent rounded-3xl ${
              accountType === "Instructor" ? "bg-richblack-900 text-white" : ""
            }`}
          >
            Instructor
          </span>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleOnSubmit}>
          <div className=" flex gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm">
                First Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                className=" bg-richblack-800 p-2 border-transparent rounded-lg"
                placeholder="Enter first name"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">
                Last Name <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                className=" bg-richblack-800 p-2 border-transparent rounded-lg"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Email Address <span className="text-red-700">*</span>
            </label>
            <input
              type="email"
              className="bg-richblack-800 w-full p-2 border-transparent rounded-lg"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm ">
              Phone no <span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              className="bg-richblack-800 p-2 w-full border-transparent rounded-lg"
              placeholder="Enter phone no"
              name="phone"
              // value={phone}
              // onChange={handleOnChange}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col w-fit gap-2">
              <label className="text-sm">
                Create password <span className="text-red-700">*</span>
              </label>
              <input
                type="password"
                className=" bg-richblack-800 p-2 border-transparent rounded-lg"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col w-fit gap-2">
              <label className="text-sm">
                confirm password <span className="text-red-700">*</span>
              </label>
              <input
                type="password"
                className=" bg-richblack-800 p-2 border-transparent rounded-lg"
                placeholder="Confirm password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex w-full px-2 mt-1">
            <button className="text-black w-full bg-yellow-50 px-5 py-3 border-transparent rounded-xl">
              Create Acount
            </button>
          </div>
        </form>
      </div>
      <div className="relative mt-16">
        <img src={Frame} alt="" />
        <img src={Signup} alt="" className="absolute right-4 -top-4" />
      </div>
    </div>
  );
};

export default SignUp;
