exports.courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Confirmation For Course Registration</title>
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
            <a href="http://localhost:3000"><img class="logo" src="<a href="https://imgbb.com/"><img src="https://i.ibb.co/R4YfCzWP/Logo-Full-Light.png" alt="Logo-Full-Light" border="0"></a>"
                    alt="DevAssist Logo"></a>
            <div class="message">Confirmation of Course Registration</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>You have successfully registered for the course <span class="highlight">"${courseName}"</span>. We
                    are extremely pleased to have you as one of our students</p>
                <p>To access the study material, lectures, etc. please login and start your learning journey
                </p>
                <a class="cta" href="http://localhost:3000/dashboard"> Go to Dashboard </a>
            </div>
            <div class="support">If you need any help or if you have any question you can contact us at <a
                    href="mailto:DevAssistHelp@DevAssist.com">DevAssistHelp@DevAssist.com</a>. We will help you</div>
        </div>
    </body>
    
    </html>`;
  };