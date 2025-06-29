const Tag = require("../models/tags");

exports.createTag = async (req, res) => {

    try {

        const { name, description } = req.body;

        if (!name || !description) {

            return res.status(400).json({
                success: false,
                message: "All fields should be filled",
            });

        }

        const tagDet = await Tag.create({

            name: name,
            description: description,

        });

        console.log(tagDet);

        return res.status(200).json({
            success: true,
            message: "Successfully Created Tag",
        })

    }

    catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

exports.showAlltags = async (req, res) => {

    try {

        const allTags = await Tag.find({}, { name: true, description: true });

        res.status(200).json({

            success: true,
            message: "Successfully Fetched all the tags",
            allTags,

        })

    }

    catch (err) {

        return res.status(500).json({
            success: false, 
            message: err.message
        })

    }
}