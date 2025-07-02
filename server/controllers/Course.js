const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")

exports.createCourse = async (req, res) => {
  try {

    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag|| !category  ||
      !thumbnail
    ) 
    
    {
      return res.status(400).json({
        success: false,
        message: "All Fields are required, please fill them",
      });
    }

    if (!status || status === undefined) {
      status = "Draft"
    }

    const userId = req.user.id;

    const instructorDet = await User.findById(userId, {
      accountType: "Instructor",
    });

    console.log("Instructor Details: ", instructorDet);

    if (!instructorDet) {
      return res.status(404).json({
        success: false,
        message: "Details of Instructor Not Found",
      });
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
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
      tag: tag,
      category: categoryDetails._id,
      status: status,
      instructions: instructions,
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

    await Category.findByIdAndUpdate(

      { _id: category },

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
          select: "-videoUrl"
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `The course with id: ${courseId} could not be found`,
      })
    }

    // let totalDurationInSeconds = 0

    // courseDetails.courseContent.forEach((content) => {

    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //     totalDurationInSeconds += timeDurationInSeconds
    //   })
      
    // })

    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      message: "Successfully fetched course details",
      data: {
        courseDetails,
        // totalDuration,
      }

    })

  }

  catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }

}

exports.editCourse = async (req, res) => {

  try {

    const { courseId } = req.body

    const updates = req.body

    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course is not found" })
    }

    if (req.files) {
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }


    for (const key in updates) {

      if (updates.hasOwnProperty(key)) {

        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        }

        else {
          course[key] = updates[key]
        }

      }

    }

    await course.save()

    const updatedCourse = await Course.findOne({
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

    res.json({
      success: true,
      message: "Successfully updated course",
      data: updatedCourse,
    })
  }

  catch (error) {

    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }

}

exports.getAllCourses = async (req, res) => {

  try {

    const allCourses = await Course.find(
      { status: "Published" },
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
      data: allCourses,
    })
  }

  catch (error) {

    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Error in Fetching Course Data`,
      error: error.message,
    })
  }

}

exports.getFullCourseDetails = async (req, res) => {

  try {

    const { courseId } = req.body

    const userId = req.user.id

    const courseDetails = await Course.findOne({
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

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `The course with id: ${courseId} could not be found`,
      })
    }

    let totalDurationInSeconds = 0

    courseDetails.courseContent.forEach((content) => {

      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })

    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  }

  catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }

}

exports.getInstructorCourses = async (req, res) => {
  try {

    const instructorId = req.user.id

    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  }

  catch (error) {

    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })

  }
}

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {

      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })

    }

    const courseSections = course.courseContent
    for (const sectionId of courseSections) {

      const section = await Section.findById(sectionId)

      if (section) {

        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }

      }

      await Section.findByIdAndDelete(sectionId)
    }

    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Successfully deleted course",
    })

  }

  catch (error) {

    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }

}