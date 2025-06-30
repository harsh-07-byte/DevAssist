exports.passwordUpdated = (email, name) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Confirmation Mail For Password Updation</title>
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
                    src="https://i.postimg.cc/3RbZ65NW/9643e65b-97e5-461c-a9f2-2734319f6d13.png" alt="DevAssist Logo"></a>
            <div class="message">Confirmation For Password Update</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>Your password has been successfully updated<span class="highlight">${email}</span>.
                </p>
                <p>If this password change was not requested by you, please contact us for your account security</p>
            </div>
            <div class="support">If you are facing any problems or want any help, please contact us at 
                <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};