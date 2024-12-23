import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { FaVideo } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import SubSectionModal from "./SubSectionModal";
import { deleteSection } from "../../../../../service/operations/courseAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../redux/slices/courseSlice";

const SectionTable = ({ course, handleEditSectionName }) => {
  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubsection, setEditSubSection] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("course", course);

  const handleDeleteSection = async (sectionId) => {
    try {
      const updatedCourse = await deleteSection(sectionId, course._id, token);
      console.log(updatedCourse);
      dispatch(setCourse(updatedCourse));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className="bg-richblack-700 p-10 text-richblack-5 mt-10 flex flex-col gap-5 border-transparent rounded-lg">
      {course.courseContent && course.courseContent.length > 0 ? (
        course.courseContent.map((section) => (
          <details key={section._id} className="flex justify-between w-full flex-col">
            <summary className="flex  w-full justify-between border border-transparent border-b-richblack-200 pb-3">
              <div className="flex gap-7 items-center">
                <HiOutlineMenu className="text-2xl text-richblack-100" />
                {section.sectionName}
                {/* Render section name */}
              </div>
              <div className="flex gap-3 text-2xl text-richblack-100">
                <button
                  onClick={() => {
                    handleEditSectionName(section.sectionName, section._id);
                  }}
                  className="cursor-pointer"
                >
                  <MdModeEdit />
                </button>
                <button onClick={() => handleDeleteSection(section._id)}>
                  <RiDeleteBinLine />
                </button>
                <RiArrowDropDownLine />
              </div>
            </summary>
            {section.subSections?.map((data) => {
              return (
                <div
                  key={data._id}
                  className="flex justify-between mx-5 py-3 border border-transparent border-b-richblack-200"
                >
                  <div className="flex gap-7 items-center">
                    <FaVideo className="text-xl text-richblack-100" />
                    {data.title}
                  </div>
                  <div className="flex gap-3 text-2xl text-richblack-100">
                    <MdModeEdit onClick={() => setEditSubSection(data._id)} />
                    <RiDeleteBinLine />
                  </div>
                </div>
              );
            })}

            <div className="mx-5 py-3">
              <button
                onClick={() => setAddSubSection(section._id)}
                className="flex text-yellow-50 justify-between gap-2 font-bold"
              >
                <IoMdAdd className="text-2xl" /> Add Lecture
              </button>
            </div>
          </details>
        ))
      ) : (
        <span>No sections available for this course.</span> // Corrected message
      )}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          edit={false}
        />
      ) : editSubsection ? (
        <SubSectionModal
          modalData={editSubsection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SectionTable;
