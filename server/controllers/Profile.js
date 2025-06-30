const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course")


exports.updateProfile = async (req, res) => {

  try {

    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

    const id = req.user.id;

    if (!contactNumber || !gender || !id) {

      return res.status(400).json({
        success: false,
        message: "You must provide all the fields",
      });

    }

    const userDetails = await User.findById(id);

    const profileId = userDetails.additionalDetails;

    const profileDetails = await Profile.findById(profileId);

    profileDetails.dateOfBirth = dateOfBirth;

    profileDetails.about = about;

    profileDetails.gender = gender;

    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();

    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()

    return res.status(200).json({
      success: true,
      message: "Successfully updated profile",
      profileDetails,
    })
  }

  catch (error) {

    return res.status(500).json({
      success: false,
      message: "An error occurred while updating profile,please try again",
      error: error.message,
    })

  }

}


exports.deleteAccount = async (req, res) => {

  try {

    const id = req.user.id;

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      })
    }

    //remove student from enrolled 

    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnrolled: id } },
        { new: true }
      )
    }

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Successfully deleted account",
    })

    await CourseProgress.deleteMany({ userId: id })

  }

  catch (err) {

    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting account,please try again",
      error: err.message,
    })

  }
}


exports.getAllUserDetails = async (req, res) => {

  try {

    const id = req.user.id;

    const userDetails = await User.findById(id).populate("additionalDetails").exec();

    return res.status(200).json({
      success: true,
      message: "Successfully fetched user details",
      userDetails
    });

  }

  catch (err) {

    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching user details, please try again",
      error: err.message,
    })

  }
}
