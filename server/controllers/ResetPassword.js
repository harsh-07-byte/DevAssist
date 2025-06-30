const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {

    try {

        const email = req.body.email;

        const user = await User.findOne({ email: email });

        if (!user) {

            return res.json({
                success: false,
                message: "User with this email does not exist, please register first",
            });

        }

        const token = crypto.randomBytes(20).toString("hex")

        const updatedDetails = await User.findOneAndUpdate({ email: email }, {
            token: token,
            resetPasswordExpires: Date.now() + 15 * 60 * 1000,
        },

            { new: true });

        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email, "Link to Reset Password", `Link to Reset Password: ${url}`);

        return res.json({

            success: true,
            message: "Email to reset password has been sent successfully, please check email and reset the password",

        });

    }

    catch (error) {

        console.log(error);
        return res.status(500).json({

            success: false,
            message: "Something went wrong !"

        })

    }

}

exports.resetPassword = async (req, res) => {

    try {

        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {

            return res.json({

                success: false,
                message: "Passwords are not matching, please try again",

            })

        }

        const userDetails = await User.findOne({ token: token });

        if (!userDetails) {

            return res.json({

                success: false,
                message: "Invalid Token",

            })

        }

        if (userDetails.resetPasswordExpires > Date.now()) {

            return res.json({
                success: false,
                message: "The time to reset the password (token) has expired, please try again",
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(

            { token: token },

            { password: hashedPassword },

            { new: true }

        );

        return res.status(200).json({
            success: true,
            message: "Successfully reset the password, please login again",
        });

    }

    catch (err) {

        console.log(err);
        console.log(err.message);

        return res.json({

            success: false,
            message: "Some error occurred while resetting the password"

        })

    }
}