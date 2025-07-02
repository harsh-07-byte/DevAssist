const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require("../models/Profile");
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
require("dotenv").config();
const { passwordUpdated } = require("../mail/passwordUpdate");

exports.sendotp = async (req, res) => {

    try {

        const { email } = req.body;

        const checkUserIsPresent = await User.findOne({ email });

        if (checkUserIsPresent) {

            return res.status(401).json({

                success: false,
                message: "User has already register",

            })
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP is generated : ", otp);

        const result = await OTP.findOne({ otp: otp });

        while (result) {

            otp = otpGenerator.generator(6, {
                upperCaseAlphabets: false,
            })
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        const otpBody = await OTP.create(otpPayload);

        console.log("Database entry for OTP:", otpBody);

        console.log(otpBody);

        return res.status(200).json({

            success: true,
            message: "OTP has been successfully sent to your email",
            otp,

        });

    }

    catch (err) {
        console.log("Error ocurred while sending OTP", err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

exports.signup = async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body


        if (!firstName || !lastName || !email || !password || !confirmPassword
            || !otp) {
            return res.status(403).json({
                success: false,
                message: "You need to fill all the fields, please try again",
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Both passwords should be same, please try again",
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User has already registered with this email",
            })
        }

        const mostRecentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(mostRecentOtp);

        if (mostRecentOtp.length == 0) {

            return res.status(400).json({
                success: false,
                message: "OTP is not found",
            })
        }

        else if (otp !== mostRecentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "The OTP is invalid",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let approved = ""
        approved === "Instructor" ? (approved = false) : (approved = true)

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            accountType: accountType,
            approved: approved,
            contactNumber,
            password: hashedPassword,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,

        });

        return res.status(200).json({
            success: true,
            message: "User has signed up successfully",
            user,
        })
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Signup Failure, please try again",
        })
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "You need to fill all the fields, please try again",
            })
        }   

        const user = await User.findOne({ email }).populate("additionalDetails");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered with this email, please sign up first",
            })
        }

        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "12h",
            })

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "The user has logged in successfully",
            })
        }

        else {
            return res.status(401).json({
                success: false,
                message: "User has entered the wrong password, please try again",
            })
        }

    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login, please try again",
        })
    }
}

exports.changePassword = async (req, res) => {

    try {

        const userDetails = await User.findById(req.user.id);

        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );

        if (!isPasswordMatch) {

            return res
                .status(401)
                .json({ success: false, message: "The password entered is incorrect, please try again" });
        }

        if (newPassword !== confirmNewPassword) {

            return res.status(400).json({
                success: false,
                message: "The new password and confirm password do not match, please try again",
            });
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password has been successfully updated for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email successfully sent:", emailResponse.response);
        }

        catch (error) {

            console.error("While sending mail error occurred", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        return res
            .status(200)
            .json({ success: true, message: "Your password has been updated successfully" });
    }

    catch (error) {

        console.error("Error while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error while updating password",
            error: error.message,
        });
    }

}