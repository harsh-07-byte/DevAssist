
const mongoose = require("mongoose");
const { resetPassword } = require("../controllers/ResetPassword");


const userSchema = new mongoose.Schema(
	{
		
		firstName: {
			type: String,
			required: true,
			trim: true,
		},

		lastName: {
			type: String,
			required: true,
			trim: true,
		},

		email: {
			type: String,
			required: true,
			trim: true,
		},

		
		password: {
			type: String,
			required: true,
		},
		
		accountType: {
			type: String,
			enum: ["Admin", "Student", "Instructor"],
			required: true,
		},

		additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},

		token: {
			type: String,
		},

		resetPasswordExpires: {
			type: Date,	
		},

		courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],

		image: {
			type: String,
			required: true,
		},
        
		courseProgress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "courseProgress",
			},
		],
    }
);


module.exports = mongoose.model("user", userSchema);