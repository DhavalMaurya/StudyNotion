import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import SectionTabel from "./SectionTabel";
import {
  createSection,
  editSection,
} from "../../../../../service/operations/courseAPI";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import Button from "../../../Home/button";
import toast from "react-hot-toast";

const CourseBuilder = () => {

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [editSectionName, setEditSectionName] = useState(null);

  useEffect(() => {
    console.log(course);
  }, [course]);

  const handleEditSectionName = (sectionName, sectionId) => {
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const handleCancel = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  //handle submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("sectionName", data.sectionName);
    formData.append("courseId", course._id);
    formData.append("token", token);
    try {
      if (editSectionName) {
        const result = await editSection(editSectionName, formData);
        console.log("result ", result);
        if (result) {
          // const updatedCourse = { ...course, courseContent: data }; Its not working properly
          const updatedCourse = {
            ...course,
            courseContent: course.courseContent.map((section) =>
              section._id === editSectionName
                ? { ...section, ...data }
                : section
            ),
          };
          console.log("updated course", updatedCourse);
          dispatch(setCourse(updatedCourse));
          console.log("edited ", updatedCourse , "course ", course); 
          setEditSectionName(null);
        } else {
        }
      } else {
        const result = await createSection(formData);
        if (result) {
          dispatch(setCourse(result));
        }
      }
    } catch (error) {
      console.log("failed to create section", error);
    }
    setValue("sectionName", "");
  };

  const handleNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("please add at least on Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSections.length === 0)
    ) {
      toast.error("add at least one lecture in each section");
      return;
    }
    toast.success("course created");
    dispatch(setStep(3));
  };

  return (
    <div className=" relative text-white mt-16 bg-richblack-800 p-10 border-richblack-700 border-[1px] rounded-xl ">
      <h1 className="text-3xl font-bold mb-4">Course Builder</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="courseSection" className="text-sm tracking-wide">
          Section Name <span className="text-red-700">*</span>
        </label>
        <input
          type="text"
          id="sectionName"
          {...register("sectionName", { required: true })}
          placeholder="Add a section to build your course"
          className="mt-3 bg-richblack-700 p-2 w-full border-transparent rounded-lg shadow-sm shadow-white"
        />
        <div className="flex gap-5 items-end ">
          <div>
            <button className="text-yellow-50 flex justify-center items-center font-bold gap-2 px-4 py-2 border-2 border-yellow-50 rounded-xl mt-5 ">
              {editSectionName ? "Update section" : " Create Section"}{" "}
              <IoMdAdd className="text-xl font-bold" />
            </button>
          </div>
          <div
            className={`${editSectionName ? "" : "hidden"}`}
            onClick={handleCancel}
          >
            <Button active={true}>Cancel</Button>
          </div>
        </div>
      </form>
      <SectionTabel
        course={course}
        handleEditSectionName={handleEditSectionName}
      />
      <div className="Buttons flex justify-end gap-5 mt-7 ">
        <button className="px-4 py-1 bg-richblack-700 border-transparent rounded-xl">
          Back
        </button>
        <button onClick={handleNext}>
          <Button active={true}>Next</Button>
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;
