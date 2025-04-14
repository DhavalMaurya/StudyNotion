// import React, { useState } from 'react'
// import Button from '../Home/button'
// import { FaUserEdit } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import toast from 'react-hot-toast';
// import {useNavigate} from 'react-router-dom'


// const MyProfile = () => {

//   const {user} = useSelector((state)=>state.profile)
//   const navigate = useNavigate();

//   const logOut = () =>{
//     localStorage.removeItem('token');
//     localStorage.removeItem('expiryTime');
//     localStorage.removeItem('user');
//     toast.success("Logout successfully");
//     window.location.href = "/"
//   }
//   return (
//     <div className='text-white px-5 xl:px-16'>
//         <h1 className='text-lg lg:text-3xl'>My Profile</h1>
//         <div>
//             <div className='flex gap-10 bg-richblack-800 items-center justify-between px-10 py-10 mt-6 border-[1px] border-richblack-700 rounded-2xl'>
//                 <div className='flex gap-10 items-center'>
//                 <img className='border-transparent rounded-full size-15 sm:size-20 md:size-24' src={user.image} alt="" />
//                 <div className=''>
//                     <p>{`${user.firstName} ${user.lastName}`}</p>
//                     <p>{user.email}</p>
//                 </div>
//                 </div>
//                 <Button active={true}><div className='flex gap-2 items-center'><FaUserEdit/> <span onClick={logOut}>Log out</span></div></Button>
//             </div>
//         </div>
//         <div className='About flex flex-col gap-5 bg-richblack-800 px-10 py-10 mt-6 border-[1px] border-richblack-700 rounded-2xl'>
//             <div className="Top flex justify-between items-center  ">
//                 <p className='text-2xl'>About</p>
//                 <Button active={true}><div className='flex gap-2 items-center'><FaUserEdit/> <span>Edit</span></div></Button>
//             </div>
//             <div>
//                 <p className='text-richblack-200'>Write something about yourself</p>
//             </div>
//         </div>
//         <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-10">
//         <div className="flex w-full items-center justify-between">
//           <p className="text-lg font-semibold text-richblack-5">
//             Personal Details
//           </p>
//             <Button active={true}><div className='flex gap-2 items-center'><FaUserEdit /> <span>Edit</span></div></Button>
//         </div>
//         <div className="flex max-w-[500px] justify-between">
//           <div className="flex flex-col gap-y-5">
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">First Name</p>
//               <p className="text-sm font-medium text-richblack-5">
//                {user?.firstName}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Email</p>
//               <p className="text-sm font-medium text-richblack-5">
//               {user?.email}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Gender</p>
//               <p className="text-sm font-medium text-richblack-5">
//                Add Gender
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-col gap-y-5">
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Last Name</p>
//               <p className="text-sm font-medium text-richblack-5">
//               {user?.lastName}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
//               <p className="text-sm font-medium text-richblack-5">
//               Add Contact Number
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
//               <p className="text-sm font-medium text-richblack-5">
//                Add DOB
//               </p>
//             </div>
//           </div>
//           </div>
//           </div>
//           {/* {
//             editProfile ? <EditProfileModal profileData={user} cancelEditProfileModal={()=>{setEditProfile(false)}}/> : ""
//           } */}
//     </div>
//   )
// }

// export default MyProfile



import React from 'react'
import Button from '../Home/button'
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryTime');
    localStorage.removeItem('user');
    toast.success("Logout successfully");
    window.location.href = "/"
  }

  return (
    <div className="text-white px-4 sm:px-6 md:px-8 xl:px-16 py-6 space-y-8 max-w-7xl mx-auto">

      {/* Heading */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">My Profile</h1>

      {/* Profile Card */}
      <div className="border border-richblack-700 rounded-lg bg-richblack-800 px-4 py-5 sm:px-6 sm:py-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left w-full sm:w-auto">
          <img
            className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover border border-richblack-600"
            src={user.image}
            alt="profile"
          />
          <div>
            <p className="text-base sm:text-lg font-semibold truncate">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-sm text-richblack-300 break-words">{user.email}</p>
          </div>
        </div>
        <div className="w-full sm:w-auto text-center sm:text-left">
          <Button active={true}>
            <div className="flex gap-2 items-center justify-center text-sm sm:text-base">
              <FaUserEdit /> <span onClick={logOut}>Log out</span>
            </div>
          </Button>
        </div>
      </div>

      {/* About Section */}
      <div className="border border-richblack-700 rounded-lg bg-richblack-800 px-4 py-5 sm:px-6 sm:py-6 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-lg font-semibold">About</p>
          <Button active={true}>
            <div className="flex gap-2 items-center text-sm sm:text-base">
              <FaUserEdit /> <span>Edit</span>
            </div>
          </Button>
        </div>
        <p className="text-sm text-richblack-200 leading-relaxed">
          Write something about yourself
        </p>
      </div>

      {/* Personal Details */}
      <div className="border border-richblack-700 rounded-lg bg-richblack-800 px-4 py-5 sm:px-6 sm:py-6 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-lg font-semibold">Personal Details</p>
          <Button active={true}>
            <div className="flex gap-2 items-center text-sm sm:text-base">
              <FaUserEdit /> <span>Edit</span>
            </div>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Column 1 */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-richblack-600 mb-1">First Name</p>
              <p className="font-medium text-richblack-5">{user?.firstName}</p>
            </div>
            <div>
              <p className="text-xs text-richblack-600 mb-1">Email</p>
              <p className="font-medium text-richblack-5">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-richblack-600 mb-1">Gender</p>
              <p className="font-medium text-richblack-5">Add Gender</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-richblack-600 mb-1">Last Name</p>
              <p className="font-medium text-richblack-5">{user?.lastName}</p>
            </div>
            <div>
              <p className="text-xs text-richblack-600 mb-1">Phone Number</p>
              <p className="font-medium text-richblack-5">Add Contact Number</p>
            </div>
            <div>
              <p className="text-xs text-richblack-600 mb-1">Date Of Birth</p>
              <p className="font-medium text-richblack-5">Add DOB</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MyProfile
