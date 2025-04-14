import React, {useState } from "react";
import Frame from "../assets/frame.png";
import Signup from "../assets/signup.png";
import { useDispatch} from "react-redux";
import { setSingupData } from "../redux/slices/authSlice";
import { sendOTP } from "../service/operations/authAPI";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import toast from "react-hot-toast";


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
    if (password !== confirmPassword) {
      toast.error("Passwords Does Not Match")
      return
    }
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
    <div className="text-gray-500 font-bold px-3 pb-10 md:px-18 lg:px-28 pt-16 flex gap-20 justify-between bg-richblack-900">
      <div className=" flex flex-col gap-3 overflow-hidden px-10">
        <p className="text-white text-lg sm:text-2xl md:text-3xl">
          Join the millions learning to code with StudyNotion for free
        </p>
        <p className="text-xs md:text-base">
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
          <div className=" flex flex-col gap-3 sm:flex-row">
          <InputField label={"First Name"} type={"text"} placeholder={"Enter first name"} value={firstName} changeFunc={handleOnChange} name={"firstName"}/>
          <InputField label={"Last Name"} type={"text"} placeholder={"Enter last name"} value={lastName} changeFunc={handleOnChange} name={"lastName"}/>
          </div>
          <InputField label={"Email Address"} type={"email"} placeholder={"Enter email "} value={email} changeFunc={handleOnChange} name={"email"}/>
          <InputField label={"Phone no"} type={"number"} placeholder={"Enter contact no "}  name={"contact"}/>
          <div className="flex gap-3 flex-col sm:flex-row ">
          <InputField label={"Create Password"} type={"password"} placeholder={"Enter password "} value={password} changeFunc={handleOnChange} name={"password"}/>
          <InputField label={"Confirm Password"} type={"password"} placeholder={"Enter password again "} value={confirmPassword} changeFunc={handleOnChange} name={"confirmPassword"}/>
          </div> 
          <div className="flex w-full px-2 mt-1">
            <button className="text-black w-full bg-yellow-50 px-5 py-3 border-transparent rounded-xl">
              Create Acount
            </button>
          </div>
        </form>
      </div>
      <div className="relative mt-16 hidden xl:block ">
        <img src={Frame} alt="" />
        <img src={Signup} alt="" className="absolute right-4 -top-4" />
      </div>
    </div>
  );
};

export default SignUp;
