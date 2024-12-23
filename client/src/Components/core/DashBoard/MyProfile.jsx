import React, { useState } from 'react'
import Button from '../Home/button'
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";


const MyProfile = () => {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className='text-white px-20'>
        <h1 className='text-3xl'>My Profile</h1>
        <div>
            <div className='flex gap-10 bg-richblack-800 items-center justify-between px-10 py-10 mt-6 border-[1px] border-richblack-700 rounded-2xl'>
                <div className='flex gap-10 items-center'>
                <img className='border-transparent rounded-full w-24 h-24 ' src={user.image} alt="" />
                <div className=''>
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <p>{user.email}</p>
                </div>
                </div>
                <Button active={true}><div className='flex gap-2 items-center'><FaUserEdit/> <span>Edit</span></div></Button>
            </div>
        </div>
        <div className='About flex flex-col gap-5 bg-richblack-800 px-10 py-10 mt-6 border-[1px] border-richblack-700 rounded-2xl'>
            <div className="Top flex justify-between items-center  ">
                <p className='text-2xl'>About</p>
                <Button active={true}><div className='flex gap-2 items-center'><FaUserEdit/> <span>Edit</span></div></Button>
            </div>
            <div>
                <p className='text-richblack-200'>Write something about yourself</p>
            </div>
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-10">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
            <Button active={true}><div className='flex gap-2 items-center'><FaUserEdit /> <span>Edit</span></div></Button>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
               {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
              {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
               Add Gender
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
              {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
              Add Contact Number
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
               Add DOB
              </p>
            </div>
          </div>
          </div>
          </div>
          {/* {
            editProfile ? <EditProfileModal profileData={user} cancelEditProfileModal={()=>{setEditProfile(false)}}/> : ""
          } */}
    </div>
  )
}

export default MyProfile