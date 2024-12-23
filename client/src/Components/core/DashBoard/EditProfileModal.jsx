import React, { useState } from "react";

const EditProfileModal = ({ cancelEditProfileModal, profileData }) => {
    console.log(profileData)
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [about, setAbout] = useState("");


  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleDeleteAccount = () => {
    alert("Account deleted successfully");
  };

  const handleOnSubmit = async () => {
    console.log(profileImage, name, dob, gender, contactNumber, about);
    cancelEditProfileModal();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-opacity-20 backdrop-blur-md">
      <div className="w-full max-w-[600px] bg-richblack-800 p-6 rounded-lg shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={cancelEditProfileModal}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300"
        >
          &times;
        </button>

        {/* Title */}
        <div className="mb-4 text-center">
          <h1 className="text-white text-2xl font-semibold">Edit Profile</h1>
        </div>

        {/* Profile Image Section */}
        <div className="mb-6 flex flex-col items-center gap-4">
          <img
            src={profileImage || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="text-sm text-gray-500"
          />
        </div>

        {/* Profile Information Form */}
        <form className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-sm text-white">Name</label>
              <input
                type="text"
                className="bg-richblack-700 p-2 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-sm text-white">Date of Birth</label>
              <input
                type="date"
                className="bg-richblack-700 p-2 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-sm text-white">Gender</label>
              <select
                className="bg-richblack-700 p-2 w-full border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-sm text-white">Contact Number</label>
              <input
                type="text"
                className="bg-richblack-700 p-2 w-full border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">About</label>
            <textarea
              className="bg-richblack-700 p-2 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Tell us about yourself"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </form>

        {/* Save Changes Button */}
        <div className="mt-6">
          <button
            onClick={handleOnSubmit}
            className="w-full bg-yellow-500 text-black px-5 py-3 rounded-lg font-semibold hover:bg-yellow-400"
          >
            Save Changes
          </button>
        </div>

        {/* Delete Account Section */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <h2 className="text-lg font-semibold text-red-600">Delete Account</h2>
          <p className="text-sm text-gray-300 mt-2">
            Once you delete your account, all your data will be permanently
            removed.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="w-full mt-4 p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
