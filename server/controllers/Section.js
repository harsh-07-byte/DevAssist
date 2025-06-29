const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSectionModal = require("../models/SubSection");

exports.createSection = async (req, res) => {

    try {

        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId) {

            return res.status(400).json({
                success: false,
                message: "All fields need to be filled",
            })

        }

        const newSection = await Section.create({ sectionName });

        const updatedCourseDetails = await Course.findByIdAndUpdate(

            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },

            { new: true }

        )

            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })

            .exec();

        return res.status(200).json({
            success: true,
            message: "Section has been created Successfully",
            updatedCourseDetails,
        })

    }


    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error occurred while creating section, please try again",
            error: error.message,
        })

    }

}

exports.updateSection = async (req, res) => {

    try {

        const { sectionName, sectionId } = req.body;

        if (!sectionName || !sectionId) {

            return res.status(400).json({
                success: false,
                message: "All fields need to be filled",
            })

        }

        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        const section = await Section.findByIdAndUpdate(sectionId,

            { sectionName: sectionName },

            { new: true });

        return res.status(200).json({
            success: true,
            message: "Successfully updated section",
        });

    }


    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error occurred while updating section, please try again",
            error: error.mesage,
        })

    }

}

exports.deleteSection = async (req, res) => {

    try {

        const { sectionId, courseId } = req.body;

        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })

        const section = await Section.findById(sectionId);

        console.log(sectionId, courseId);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "The section you are trying to delete does not exist",
            })
        }

        await SubSection.deleteMany({ _id: { $in: section.subSection } });

        await Section.findByIdAndDelete(sectionId);

        const course = await Course.findById(courseId).populate({

            path: "courseContent",
            populate: {
                path: "subSection"
            }

        })

            .exec();

        res.status(200).json({
            success: true,
            message: "Successfully deleted section",
            data: course
        });

    }

    catch (error) {

        console.error("Error deleting section:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};   