const Profile = require('../models/Profile')
const User = require('../models/User');
const Course = require('../models/Course')

exports.updateProfile = async (req, res) => {
    try {
        //fetch data
        const { dob = "", about = "", gender, contactNumber } = req.body;
        const userId = req.user.id;
        console.log("User Id :", userId)
        //validation
        if (!contactNumber || !gender) {
            return res.status(400).json({ success: false, message: "ALl fields require" });
        }

        //find profile
        const userDetail = await User.findById(userId);
        const profileId = userDetail.additionalDetail;
        const profileDetail = await Profile.findById(profileId);

        //update profile //other method to update data
        profileDetail.dob = dob;
        profileDetail.about = about;
        profileDetail.gender = gender;
        profileDetail.contactNumber = contactNumber;
        //save it
        await profileDetail.save();

        //return response
        return res.status(200).json({ success: true, message: "Profile updated successfully", profileDetail });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: " Something went wrong while updating profile " });
    }

}

exports.getUserDetails = async (req, res) => {
    try {

        //fetch user id from req.user
        const userId = req.user.id;

        //validation
        if (!userId) {
            return res.status(400).json({ success: false, message: "Usesr ID not found , You need to login first" });
        }

        //get user details from db
        const userDetail = await User.findById(userId).populate("additionalDetail");

        //if detail not found
        if (!userDetail) {
            return res.status(400).json({ success: false, message: "User not found"});
        }

        //return response
        return res.status(200).json({ success: true, message: "User details fetched successfully",data : userDetail})


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: " Something went wrong while fetching the user details " , error});
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        //get id
        const { userId } = req.user;

        //validation
        const userDetail = await User.findById(userId);
        if (!userDetail) {
            return res.status(404).json({ success: false, message: "Account not find" })
        }

        //delete profile
        await Profile.findByIdAndDelete({ _id: userDetail.additionalDetail });

        //unenroll student from course


        //delete user
        await User.findByIdAndDelete({ _id: userId });

        //return response
        return res.status(200).json({ success: true, message: "Account deleted successfully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: " Something went wrong while deleting account" });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
      .populate({
        path: "course",
        populate: {
        path: "courseContent",
        populate: {
          path: "subSections",
        },
        },
      })
      .exec()

    //   userDetails = userDetails.toObject()
	//   var SubsectionLength = 0
	//   for (var i = 0; i < userDetails.course.length; i++) {
	// 	let totalDurationInSeconds = 0
	// 	SubsectionLength = 0
	// 	for (var j = 0; j < userDetails.course[i].courseContent.length; j++) {
	// 	  totalDurationInSeconds += userDetails.course[i].courseContent[
	// 		j
	// 	  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
	// 	  userDetails.course[i].totalDuration = convertSecondsToDuration(
	// 		totalDurationInSeconds
	// 	  )
	// 	  SubsectionLength +=
	// 		userDetails.course[i].courseContent[j].subSection.length
	// 	}
	// 	let courseProgressCount = await CourseProgress.findOne({
	// 	  courseID: userDetails.course[i]._id,
	// 	  userId: userId,
	// 	})
	// 	courseProgressCount = courseProgressCount?.completedVideos.length
	// 	if (SubsectionLength === 0) {
	// 	  userDetails.courses[i].progressPercentage = 100
	// 	} else {
	// 	  // To make it up to 2 decimal point
	// 	  const multiplier = Math.pow(10, 2)
	// 	  userDetails.courses[i].progressPercentage =
	// 		Math.round(
	// 		  (courseProgressCount / SubsectionLength) * 100 * multiplier
	// 		) / multiplier
	// 	}
	//   }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.course,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
