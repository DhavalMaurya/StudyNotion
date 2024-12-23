import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import {
  createCourse,
  getAllCategory,
  updateCourse,
} from "../../../../../service/operations/courseAPI";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import Button from "../../../Home/button";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../../redux/slices/courseSlice";

const CourseInformation = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { course, editCourse, step } = useSelector((state) => state.course);

  function removeExcessEscaping(data) {
    // Step 1: Remove leading and trailing quotes if present
    if (data.startsWith('"') && data.endsWith('"')) {
      data = data.slice(1, -1);
    }
  
    // Step 2: Remove triple or more backslashes
    data = data.replace(/\\{2,}/g, '\\');
  
    // Step 3: Replace \" with "
    data = data.replace(/\\"/g, '"');
  
    // Step 4: Replace \n with actual newlines
    data = data.replace(/\\n/g, '\n');
  
    // Step 5: Remove any additional leading or trailing quotes that remain
    data = data.replace(/^"+|"+$/g, '');
  
    return data;
  }

  const fetchAllCategories = async () => {
    setLoading(true);
    const categories = await getAllCategory();
    if (categories.length > 0) {
      setAllCategories(categories);
      // console.log(categories);
    }
    setLoading(false);
  };

  // console.log(editCourse ? "ha" : "nahi");
  if (editCourse) {
    setValue("courseTitle", course.name);
    setValue("courseShortDesc", course.description);
    setValue("coursePrice", course.price);
    setValue("courseTag", course.Tags);
    setValue("courseCategory", course.category._id);
    setValue("courseThumbnail", course.thumbnail);
    setValue("courseBenifits", removeExcessEscaping(course.whatYouLearn));
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  //handle on submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.courseTitle);
    formData.append("description", data.courseShortDesc);
    formData.append("whatYouLearn", JSON.stringify(data.courseBenifits));
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTag));
    formData.append("category", data.courseCategory);
    formData.append("thumbnailImage", data.courseThumbnail);
    formData.append("token", token);

    if (editCourse){
      setLoading(true);
      const result = await updateCourse(formData ,course._id);
      if (result) {
        dispatch(setCourse(result));
        dispatch(setStep(2));
      } else {
        console.log("nahi aya result bhai");
      }
      setLoading(false);
    } else {
      setLoading(true);
      const result = await createCourse(formData);
      if (result) {
        dispatch(setCourse(result));
        dispatch(setStep(2));
        dispatch(setEditCourse(null))
      } else {
        console.log("something went wrong while creating course");
      }
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-richblack-800 text-white mt-10 p-10 border border-transparent rounded-xl flex flex-col gap-5"
    >
      <div className="CourseTitle flex flex-col gap-3">
        <label htmlFor="courseTitle" className="text-sm tracking-wide">
          Course Title <span className="text-red-700">*</span>
        </label>
        <input
          type="text"
          id="courseTitle"
          {...register("courseTitle", { required: true })}
          placeholder="Enter Course title"
          className="bg-richblack-700 p-2 w-full border-transparent rounded-lg shadow-sm shadow-white"
        />
        {errors.courseTitle && <span> Course title is required</span>}
      </div>
      <div className="CourseShortDesc flex flex-col gap-3">
        <label htmlFor="courseShortDesc" className="text-sm tracking-wide">
          Course Short Description <span className="text-red-700">*</span>
        </label>
        <textarea
          name="courseShortDesc"
          id="courseShortDesc"
          {...register("courseShortDesc", { required: true })}
          placeholder="Enter Course short description"
          className="bg-richblack-700 p-2 h-40 w-full border-transparent rounded-lg shadow-sm shadow-white"
        ></textarea>
        {errors.courseTitle && <span> Course description required</span>}
      </div>
      <div className="relative CoursePrice flex flex-col gap-3">
        <label htmlFor="coursePrice" className="text-sm tracking-wide">
          Course Price<span className="text-red-700">*</span>
        </label>
        <input
          type="number"
          id="coursePrice"
          {...register("coursePrice", { required: true })}
          placeholder="Enter Course Price"
          className="bg-richblack-700 px-10 p-2 w-full border-transparent rounded-lg shadow-sm shadow-white"
        />
        <HiOutlineCurrencyRupee className="absolute top-10 left-2 w-6 h-6" />
        {errors.coursePrice && <span> Course price is required</span>}
      </div>
      <div className="CourseCategory flex flex-col gap-3">
        <label htmlFor="courseCategory" className="text-sm tracking-wide">
          Course Category <span className="text-red-700">*</span>
        </label>
        <select
          name="courseCategory"
          id="courseCategory"
          className="bg-richblack-700 p-2 w-full border-transparent rounded-lg shadow-sm shadow-white"
          {...register("courseCategory")}
        >
          <option value="" disabled hidden>
            Select Course category
          </option>
          {allCategories.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
        {errors.courseCategory && <span> Course category required</span>}
      </div>
      <ChipInput
        label={"Course Tag"}
        name={"courseTag"}
        placeholder={"enter course tag and press Enter key"}
        register={register}
        setValue={setValue}
        getValue={getValues}
        errors={errors}
      />
      <Upload
        label={"Course Thumbnail"}
        name={"courseThumbnail"}
        placeholder={""}
        register={register}
        setValue={setValue}
        getValue={getValues}
        errors={errors}
      />

      <div className="CourseBenifits flex flex-col gap-2">
        <label htmlFor="courseBenifits" className="text-sm tracking-wide">
          Benefits of the course <span className="text-red-700">*</span>
        </label>
        <textarea
          name="courseBenifits"
          id="courseBenifits"
          {...register("courseBenifits", { required: true })}
          placeholder="Enter benefits of the course"
          className="bg-richblack-700 p-2 h-40 w-full border-transparent rounded-lg shadow-sm shadow-white"
        ></textarea>
        {errors.courseBenifits && <span>Course benefits required</span>}
      </div>

      <div className="Submit flex justify-end">
        <Button active={true}>
          <div className="flex justify-center items-center gap-2 px-2">
            <span>{editCourse ? "Save changes" : "Next"}</span>
            <IoIosArrowForward />
          </div>
        </Button>
      </div>
    </form>
  );
};

export default CourseInformation;
