import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import CountryCode from "../../data/countrycode.json"; // Adjust the path as necessary
import Footer from "../Components/Footer"

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data", data);
    try {
      setLoading(true);
      // Mock API response
      const response = { status: "OK" };
      console.log("Logging response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className=" bg-richblack-900 text-white">
      <header className="p-10 px-24 font-bold ">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-6">
          We’d love to hear from you! Please fill out the form below.
        </p>
      </header>
      <div className="flex justify-around flex-row-reverse mx-auto p-8 ">
        {/* Contact Form */}
        <form
          className="w-[40%] flex flex-col gap-7"
          onSubmit={handleSubmit(submitContactForm)}
        >
            <h1 className="text-3xl font-bold mb-4">Fill yours Details</h1>
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* First Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="text-sm" htmlFor="firstname">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                className="text-black form-style border rounded p-2"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <span className="text-red-500">Please enter your name</span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="text-sm" htmlFor="lastname">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter last name"
                className="text-black form-style border rounded p-2"
                {...register("lastname")}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              className="text-black form-style border rounded p-2"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">
                Please enter your email address
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="phonenumber">
              Phone Number
            </label>
            <div className="flex gap-5">
              {/* Country Code Dropdown */}
              {/* <div className="flex w-[81px] flex-col gap-2">
                <select
                  name="countrycode"
                  id="countrycode"
                  {...register("countrycode", { required: true })}
                  className="form-style border rounded p-2"
                >
                  {/* {CountryCode.map((element, index) => (
                                    <option key={index} value={element.code}>
                                        {element.code} - {element.country}
                                    </option>
                                ))} */}
                {/* </select> */}
              {/* </div>  */}

              {/* Phone Number Input */}
              <div className="flex w-full flex-col gap-2">
                <input
                  type="tel"
                  name="phoneNo"
                  id="phonenumber"
                  placeholder="12345 67890"
                  {...register("phoneNo", {
                    required: {
                      value: true,
                      message: "Please enter Phone Number",
                    },
                    maxLength: { value: 10, message: "Invalid Phone Number" },
                    minLength: { value: 8, message: "Invalid Phone Number" },
                  })}
                  className="form-style border rounded p-2"
                />
              </div>
            </div>
            {errors.phoneNo && (
              <span className="text-red-500">{errors.phoneNo.message}</span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="7"
              placeholder="Enter your message here"
              {...register("message", { required: true })}
              className="form-style border rounded p-2"
            />
            {errors.message && (
              <span className="text-red-500">Please enter your message.</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-md transition-all duration-200 hover:scale-95 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Contact Information */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p>
            Email:{" "}
            <a href="mailto:support@studynotion.com" className="text-blue-600">
              support@studynotion.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+15551234567" className="text-blue-600">
              +1 (555) 123-4567
            </a>
          </p>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>

          {/* Additional Resources */}
          <h3 className="text-lg font-semibold mt-6">Need Help?</h3>
          <p>
            Check out our{" "}
            <a href="/faq" className="text-blue-600">
              FAQ section
            </a>{" "}
            for answers to common questions.
          </p>

          {/* Call-to-action */}
          <h3 className="text-lg font-semibold mt-4">
            We'd Love to Hear from You!
          </h3>
          <p>
            Your feedback helps us improve our services. Please don’t hesitate
            to contact us!
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
