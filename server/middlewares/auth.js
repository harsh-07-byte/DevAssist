const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {

    try {

        const token = req.cookies.token
            || req.body.token
            || req.header("Authorisation").replace("Bearer ", "");

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "No Token found",
            });

        }

        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

        }

        catch (err) {

            return res.status(401).json({
                success: false,
                message: "Invalid Token",
            });
        }

        next();

    }

    catch (err) {

        return res.status(401).json({
            success: false,
            message: "Something went wrong and token is not validated, please try again",
        });

    }

}

exports.isStudent = async (req, res, next) => {

    try {

        if (req.user.accountType !== "Student") {

            return res.status(401).json({
                success: false,
                message: "This is for Students only and it is a protected route",
            });

        }

        next();

    }

    catch (err) {

        return res.status(500).json({
            success: false,
            message: "The role of the user cannot be verified, please try again"
        })

    }

}

exports.isAdmin = async (req, res, next) => {

    try {

        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is for Admin only and it is a protected route"
            });
        }

        next();

    }

    catch (err) {

        return res.status(500).json({
            success: false,
            message: "The role of the user cannot be verified, please try again"
        })

    }

}

exports.isInstructor = async (req, res, next) => {

    try {

        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is Instructors only and it is a protected route"
            });
        }

        next();

    }

    catch (err) {

        return res.status(500).json({
            success: false,
            message: "The role of the user cannot be verified, please try again"
        })

    }

}