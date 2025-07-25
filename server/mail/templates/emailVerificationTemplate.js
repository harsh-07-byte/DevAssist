const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Email For OTP Verification</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="http://localhost:3000"><img class="logo"
					src="https://i.ibb.co/R4YfCzWP/Logo-Full-Light.png" alt="DevAssist Logo"></a>
			<div class="message">Email for OTP Verification</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with DevAssist. Please use the following OTP
					(One-Time Password) to verify your account and commplete your registration:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 5 minutes.Please ignore this email if you did not start the verification.
				You will have access to our platform and its features once your account is verified.</p>
			</div>
			<div class="support">If you need any help or if you have any question you can contact us at <a
                    href="mailto:DevAssistHelp@DevAssist.com">DevAssistHelp@DevAssist.com</a>. We will help you</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = otpTemplate;