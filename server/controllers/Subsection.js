const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const {uploadImageToCloudinary}=require("../utils/imageUploader");


exports.createSubSection = async (req, res) => {

  try {

    const { sectionId, title, timeDuration, description } = req.body

    const video = req.files.videoFile

   
    if (!sectionId || !title || !description || !video || !timeDuration) {

      return res
        .status(404)
        .json({ success: false, message: "Fields are missing, all are required" })

    }   

    const uploadDetails = await uploadImageToCloudinary(

      video,
      process.env.FOLDER_NAME

    )

    const subSectionDetails = await SubSection.create({

      title: title,
      timeDuration: timeDuration,
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
        data: updatedSection,})
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
  
