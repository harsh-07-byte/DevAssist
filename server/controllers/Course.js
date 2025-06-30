const Course = require("../models/Course");
const Tag = require("../models/tags");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")



exports.createCourse = async (req, res) => {
  try {

    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required, please fill them",
      });
    }

    const userId = req.user.id;

    const instructorDet = await User.findById(userId);

    console.log("Instructor Details: ", instructorDet);

    if (!instructorDet) {
      return res.status(404).json({
        success: false,
        message: "Details of Instructor Not Found",
      });
    }

    const tagDetails = await Tag.findById(tag);

    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details Not Found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDet._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    await User.findByIdAndUpdate(

      {
        _id: instructorDet._id,
      },

      {
        $push: {
          courses: newCourse._id,
        },
      },

      { new: true }

    );

    await Tag.findByIdAndUpdate(

      { _id: tagDetails._id },

      {
        $push: {
          courses: newCourse._id,
        },
      },

      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Successfully Created Course",
    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed creating the course",
      error: error.message,
    });

  }
};

exports.showAllCourses = async (req, res) => {

  try {

    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )

      .populate("instructor")
      .exec()

    return res.status(200).json({
      success: true,
      message: "Successfully fetched Data of all courses",
      data: allCourses,
    })

  }

  catch (error) {

    console.log(error)
    return res.status(404).json({
      success: false,
      message: "Error occurred while fetching course data ",
      error: error.message,
    })

  }
}

exports.getCourseDetails = async (req, res) => {

  try {

    const { courseId } = req.body

    const courseDetails = await Course.find({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `The course with id: ${courseId} could not be found`,
      })
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched course details",
      data: courseDetails,

    })

  }

  catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }

}
