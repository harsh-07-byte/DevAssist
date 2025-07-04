const mongoose=require('mongoose');
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/emailVerificationTemplate");

const OTPSchema=new mongoose.Schema({

  email:{
    type:String,
    required:true,
  },

  otp:{
    type:String,
    required:true,
  },

  createdAt:{
    type:Date,
    default:Date.now(),
    expires:60*10,
  }
});

async function sendVerificationEmail(email,otp){

  try{
    const mailResponse=await mailSender(email,"Verification email from DevAssist", emailTemplate(otp));
    console.log("Email has been sent successfully:",mailResponse);

  }

  catch(error){
    console.log("Error occured while sending mails:",error);
    throw error;
  }

}


OTPSchema.pre("save",async function(next){

	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}

  next();
  
});


module.exports=mongoose.model("OTP",OTPSchema);