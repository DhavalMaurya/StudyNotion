// import React, { useState } from "react";
// import { MdModeEdit } from "react-icons/md";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { HiOutlineMenu } from "react-icons/hi";
// import { FaVideo } from "react-icons/fa6";
// import { IoMdAdd } from "react-icons/io";
// import SubSectionModal from "./SubSectionModal";
// import { deleteSection } from "../../../../../service/operations/courseAPI";
// import { useDispatch, useSelector } from "react-redux";
// import { setCourse } from "../../../../../redux/slices/courseSlice";

// const SectionTable = ({ course, handleEditSectionName }) => {
//   const [addSubSection, setAddSubSection] = useState(null);
//   const [editSubsection, setEditSubSection] = useState(null);
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   console.log("course", course);

//   const handleDeleteSection = async (sectionId) => {
//     try {
//       const updatedCourse = await deleteSection(sectionId, course._id, token);
//       console.log(updatedCourse);
//       dispatch(setCourse(updatedCourse));
//     } catch (error) {
//       console.log("Something went wrong", error);
//     }
//   };

//   return (
//     <div className="bg-richblack-700 p-10 text-richblack-5 mt-10 flex flex-col gap-5 border-transparent rounded-lg">
//       {course.courseContent && course.courseContent.length > 0 ? (
//         course.courseContent.map((section) => (
//           <details key={section._id} className="flex justify-between w-full flex-col">
//             <summary className="flex  w-full justify-between border border-transparent border-b-richblack-200 pb-3">
//               <div className="flex gap-7 items-center">
//                 <HiOutlineMenu className="text-2xl text-richblack-100" />
//                 {section.sectionName}
//                 {/* Render section name */}
//               </div>
//               <div className="flex gap-3 text-2xl text-richblack-100">
//                 <button
//                   onClick={() => {
//                     handleEditSectionName(section.sectionName, section._id);
//                   }}
//                   className="cursor-pointer"
//                 >
//                   <MdModeEdit />
//                 </button>
//                 <button onClick={() => handleDeleteSection(section._id)}>
//                   <RiDeleteBinLine />
//                 </button>
//                 <RiArrowDropDownLine />
//               </div>
//             </summary>
//             {section.subSections?.map((data) => {
//               return (
//                 <div
//                   key={data._id}
//                   className="flex justify-between mx-5 py-3 border border-transparent border-b-richblack-200"
//                 >
//                   <div className="flex gap-7 items-center">
//                     <FaVideo className="text-xl text-richblack-100" />
//                     {data.title}
//                   </div>
//                   <div className="flex gap-3 text-2xl text-richblack-100">
//                     <MdModeEdit onClick={() => setEditSubSection(data._id)} />
//                     <RiDeleteBinLine />
//                   </div>
//                 </div>
//               );
//             })}

//             <div className="mx-5 py-3">
//               <button
//                 onClick={() => setAddSubSection(section._id)}
//                 className="flex text-yellow-50 justify-between gap-2 font-bold"
//               >
//                 <IoMdAdd className="text-2xl" /> Add Lecture
//               </button>
//             </div>
//           </details>
//         ))
//       ) : (
//         <span>No sections available for this course.</span> // Corrected message
//       )}
//       {addSubSection ? (
//         <SubSectionModal
//           modalData={addSubSection}
//           setModalData={setAddSubSection}
//           edit={false}
//         />
//       ) : editSubsection ? (
//         <SubSectionModal
//           modalData={editSubsection}
//           setModalData={setEditSubSection}
//           edit={true}
//         />
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default SectionTable;


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

  const handleDeleteSection = async (sectionId) => {
    try {
      const updatedCourse = await deleteSection(sectionId, course._id, token);
      dispatch(setCourse(updatedCourse));
    } catch (error) {
      console.error("Failed to delete section:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 lg:p-8 text-white mt-6 flex flex-col gap-4 rounded-lg border border-gray-700">
      {course.courseContent && course.courseContent.length > 0 ? (
        course.courseContent.map((section) => (
          <details
            key={section._id}
            className="group flex flex-col w-full"
            open={false}
          >
            <summary className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full py-3 px-4 bg-gray-900 rounded-md cursor-pointer border-b border-gray-600 sm:border-none">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <HiOutlineMenu className="text-xl sm:text-2xl text-gray-400 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium truncate max-w-[70%] sm:max-w-none">
                  {section.sectionName}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0 text-xl sm:text-2xl text-gray-400">
                <button
                  onClick={() => handleEditSectionName(section.sectionName, section._id)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                  aria-label={`Edit section ${section.sectionName}`}
                >
                  <MdModeEdit />
                </button>
                <button
                  onClick={() => handleDeleteSection(section._id)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                  aria-label={`Delete section ${section.sectionName}`}
                >
                  <RiDeleteBinLine />
                </button>
                <RiArrowDropDownLine className="text-2xl sm:text-3xl group-open:rotate-180 transition-transform" />
              </div>
            </summary>
            <div className="mt-2 px-4 sm:px-6">
              {section.subSections?.length > 0 ? (
                section.subSections.map((data) => (
                  <div
                    key={data._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b border-gray-600"
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <FaVideo className="text-lg sm:text-xl text-gray-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base truncate max-w-[70%] sm:max-w-none">
                        {data.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0 text-lg sm:text-xl text-gray-400">
                      <button
                        onClick={() => setEditSubSection(data._id)}
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                        aria-label={`Edit subsection ${data.title}`}
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                        aria-label={`Delete subsection ${data.title}`}
                      >
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 py-2">No lectures available.</p>
              )}
              <div className="py-3">
                <button
                  onClick={() => setAddSubSection(section._id)}
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold text-sm sm:text-base transition-colors"
                >
                  <IoMdAdd className="text-xl sm:text-2xl" />
                  Add Lecture
                </button>
              </div>
            </div>
          </details>
        ))
      ) : (
        <p className="text-sm sm:text-base text-gray-400 text-center">
          No sections available for this course.
        </p>
      )}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          edit={false}
        />
      )}
      {editSubsection && (
        <SubSectionModal
          modalData={editSubsection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}
    </div>
  );
};

export default SectionTable;