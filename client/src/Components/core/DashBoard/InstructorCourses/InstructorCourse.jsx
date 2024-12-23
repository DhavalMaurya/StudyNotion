import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "../../Home/button";
import { Link } from "react-router-dom";
import convertSecondsToDuration from "../../../../utils/secToDuration";
import ConfirmationModal from "../../../ConfirmationModal";

const InstructorCourse = ({ courses, handleDeleteCourse }) => {
  const [deleteCourse, setDeleteCourse] = useState(null);

  const modalData = {
    text1: "Are you sure want to delete",
    text2: "This action cannot be undo",
    btn1Text: "Confirm",
    btn2Text: "Cancel",
    btn1Handler: () => {
      handleDeleteCourse(deleteCourse);
      setDeleteCourse(null);
    },
    btn2Handler: () => {
      setDeleteCourse(null);
    },
  };

  const getTimeDuration = (course) => {
    let totalTimeDurationInSeconds = 0;
    course.courseContent?.forEach((content) => {
      content.subSections?.forEach((subsection) => {
        const timeDurationInSeconds = parseInt(subsection.timeDuration);
        totalTimeDurationInSeconds += timeDurationInSeconds;
      });
    });
    return convertSecondsToDuration(totalTimeDurationInSeconds);
  };

  const sentenceSplitter = (text = "", wordCount) => {
    return text.split(" ").slice(0, wordCount).join(" ");
  };

  return (
    <div className="text-white bg-richblack-900 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">My Courses</h1>
        <Link to={"/dashboard/add-course"}>
          <Button active={true}>
            <div className="flex gap-2 items-center">
              <span>Add Course</span>
              <IoAdd className="text-xl" />
            </div>
          </Button>
        </Link>
      </div>

      <Table className="w-full rounded-lg border border-richblack-800 bg-richblack-800">
        <Thead>
          <Tr className="border-b border-richblack-700 bg-richblack-900">
            <Th className="py-4 px-4 text-left">Course</Th>
            <Th className="py-4 px-8 text-center">Duration</Th>
            <Th className="py-4 px-8 text-center">Price</Th>
            <Th className="py-4 px-8 text-center">Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {courses?.map((course) => (
            <Tr key={course?._id} className="border-b border-richblack-700">
              <Td className="py-6 px-4">
                <div className="flex items-start gap-4">
                  <img
                    src={course?.thumbnail}
                    alt="Course Thumbnail"
                    className="h-[170px] w-[250px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-lg">{course?.name}</h2>
                    <p className="text-sm text-gray-400">
                      {sentenceSplitter(course.description, 30)}...
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Created At:
                      {new Date(course?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="mt-2">
                      <Link to={`/courses/${course?._id}`}>
                        <Button active={false} className="text-sm px-3 py-1">
                          Watch Course
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Td>

              <Td className="text-center text-sm px-8">
                {getTimeDuration(course)}
              </Td>

              <Td className="text-center text-sm px-8">₹{course?.price}</Td>

              <Td className="text-center px-8">
                <div className="flex justify-center gap-4">
                  <Link to={`/dashboard/edit-course/${course?._id}`}>
                    <MdOutlineModeEditOutline className="cursor-pointer text-blue-500 text-lg" />
                  </Link>
                  <RiDeleteBinLine
                    className="cursor-pointer text-red-500 text-lg"
                    onClick={() => {
                      setDeleteCourse(course?._id);
                    }}
                  />
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {deleteCourse ? <ConfirmationModal modalData={modalData} /> : ""}
    </div>
  );
};

export default InstructorCourse;
