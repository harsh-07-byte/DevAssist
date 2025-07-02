const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createSubSection = async (req, res) => {

  try {

    const { sectionId, title, description} = req.body

    const video = req.files.videoFile


    if (!sectionId || !title || !description || !video) {

      return res
        .status(404)
        .json({ success: false, message: "Fields are missing, all are required" })

    }

    const ifsection= await Section.findById(sectionId);

		if (!ifsection) {
            return res
                .status(404)
                .json({ success: false, message: "Section not found" });
  }

    const uploadDetails = await uploadImageToCloudinary(

      video,
      process.env.FOLDER_NAME

    )

    const subSectionDetails = await SubSection.create({

      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,

    })


    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: subSectionDetails._id } },
      { new: true }
    ).populate("subSection")

    console.log("Updated Section Details:", updatedSection)


    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
    })
  }

  catch (error) {

    console.error("Error creating new sub-section:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

exports.updateSubSection = async (req, res) => {

  try {

    const { sectionId, subSectionId, title, description, courseId } = req.body

    const subSection = await SubSection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();

    console.log("updated section", updatedSection)

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    })

  }

  catch (error) {

    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }

}

exports.deleteSubSection = async (req, res) => {

  try {

    const { subSectionId, sectionId, courseId } = req.body

    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })

  }
  
  catch (error) {

    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }

}
