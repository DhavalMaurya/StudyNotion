import React, { useState } from "react";
import Upload from "../CourseInformation/Upload";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import Button from "../../../Home/button";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, editSubSection } from "../../../../../service/operations/courseAPI";
import { setCourse } from "../../../../../redux/slices/courseSlice";

const SubSectionModal = ({ modalData, setModalData, edit }) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.courseTitle);
    formData.append("description", data.description);
    formData.append("videoFile", data.lectureVideo);
    formData.append("sectionId", modalData);
    formData.append("token", token);
    const plainObject = Object.fromEntries(formData.entries());
    console.log("form data", plainObject);

    if (edit) {
      console.log("edit me ha")
    formData.append("SubSectionId", modalData);
      try {
        setLoading(true)
        let result = await editSubSection(formData);
        console.log(result);
        if (result) {
          // update the structure of course
          const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData ? result : section
          )
          const updatedCourse = { ...course, courseContent: updatedCourseContent }
          dispatch(setCourse(updatedCourse));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLoading(true);
        let result = await createSubSection(formData);
        console.log(result);
        if (result) {
          // update the structure of course
          const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData ? result : section
          );
          const updatedCourse = {
            ...course,
            courseContent: updatedCourseContent,
          };
          dispatch(setCourse(updatedCourse));
        }
      } catch (error) {
        console.log(error);
      }
    }
    setModalData(null)
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className=" w-11/12 max-w-[700px] mt-32 border border-richblack-200 rounded-lg overflow-hidden ">
        <div className="flex justify-between items-center py-5 px-5 text-xl font-bold bg-richblack-700">
          <h1 className="">{edit ? "Edit lectures" : "Add lectures"}</h1>
          <RxCross2
            onClick={() => {
              setModalData(false);
            }}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-5 flex-col bg-richblack-800 p-10"
        >
          <Upload
            label={"Lecture video"}
            name={"lectureVideo"}
            placeholder={""}
            register={register}
            setValue={setValue}
            getValue={getValues}
            errors={errors}
            video={true}
          />
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
          <div className="LectureShortDesc flex flex-col gap-3">
            <label htmlFor="description" className="text-sm tracking-wide">
              Lecture Short Description <span className="text-red-700">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              {...register("description", { required: true })}
              placeholder="Enter Lecture short description"
              className="bg-richblack-700 p-2 h-40 w-full border-transparent rounded-lg shadow-sm shadow-white"
            ></textarea>
            {errors.courseTitle && <span> Course description required</span>}
          </div>
          <div className="flex justify-end">
            <Button active={true}>
              <span className="text-lg">Save</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
