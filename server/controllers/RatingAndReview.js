const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {

    try {

        const userId = req.user.id;

        const { rating, review, courseId } = req.body;

        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } },
            });

        if (!courseDetails) {

            return res.status(404).json({
                success: false,
                message: 'Not enrolled in the course so cannot give rating, review',
            });

        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId, course: courseId,
        });


        if (alreadyReviewed) {

            return res.status(403).json({
                success: false,
                message: 'The user has already given a rating and review for this course',
            });

        }

        const ratingReview = await RatingAndReview.create({
            rating, review, course: courseId, user: userId,
        });


        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true }); 

        return res.status(200).json({

            success: true,
            message: "Successfully created rating and review",
            ratingReview,
        })

    }

    catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

}

exports.getAverageRating = async (req, res) => {
    try {

        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([

            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },

            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }

        ])

        if (result.length > 0) {

            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })

        }

        return res.status(200).json({
            success: true,
            message: 'No ratings and reviews found for this course',
            averageRating: 0,

        })

    }

    catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

exports.getAllRating = async (req, res) => {

    try {

        const allReviews = await RatingAndReview.find({})

            .sort({ rating: "desc" })

            .populate({
                path: "user",
                select: "firstName lastName email image",
            })

            .populate({
                path: "course",
                select: "courseName",
            })

            .exec();

        return res.status(200).json({

            success: true,
            message: "Successfully fetched all ratings and reviews",
            data: allReviews,

        });

    }

    catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}