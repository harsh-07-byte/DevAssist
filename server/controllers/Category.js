
const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res) => {

    try {

        const { name, description } = req.body;

        if (!name) {
            return res
                .status(400)
                .json({ success: false, message: "All fields should be filled" });
        }

        const CategorysDetails = await Category.create({

            name: name,
            description: description,

        });

        return res.status(200).json({
            success: true,
            message: "Successfully Created Category",
        });

    }

    catch (error) {

        return res.status(500).json({
            success: true,
            message: error.message,
        });
    }

};

exports.showAllCategories = async (req, res) => {
    try {

        const allCategorys = await Category.find({});
        res.status(200).json({
            success: true,
            message: "Successfully Fetched all the categories",
            data: allCategorys,
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body

        const selectedCategory = await Category.findById(categoryId)

            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })

            .exec()

        if (!selectedCategory) {

            return res.status(404) .json({ 
                success: false, 
                message: "The mentioned category is not found" 
            })

        }
     
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }

        const categoriesExceptTheOneSelected = await Category.find({

                _id: { $ne: categoryId },

            })

            let differentCategories = await Category.findOne(
                categoriesExceptTheOneSelected[getRandomInt(categoriesExceptTheOneSelected.length)]
                ._id
            )
                .populate({
                path: "courses",
                match: { status: "Published" },
                })
                .exec()

            const allCategories = await Category.find()
                .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
                })
                .exec()

            const allCourses = allCategories.flatMap((category) => category.courses)

            const topSellingCourses = allCourses
                .sort((a, b) => b.sold - a.sold)
                .slice(0, 10)
            

            res.status(200).json({
                success: true,
                data: {
                selectedCategory,
                differentCategories,
                topSellingCourses,
                },
            })
            } 
            
            catch (error) {
                
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            })

            }
        }