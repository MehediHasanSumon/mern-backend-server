const EmailVerifyOtpTemplate = (user, otp, otpVerificationLink) => {
  const template = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
            }
            .email-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .email-header {
            text-align: center;
            margin-bottom: 20px;
            }
            .email-header h1 {
            font-size: 24px;
            color: #4CAF50;
            margin: 0;
            }
            .email-content {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
            }
            .email-content h2 {
            color: #FF5722;
            font-size: 20px;
            font-weight: bold;
            margin: 10px 0;
            }
            .email-footer {
            font-size: 14px;
            text-align: center;
            color: #777;
            }
            .email-footer p {
            margin: 5px 0;
            }
        </style>
        </head>
        <body>

        <div class="email-container">
            <div class="email-header">
            <h1>Email Verification</h1>
            </div>
            
            <div class="email-content">
            <p>Dear ${user.name},</p>
            <p>Thank you for signing up with our website. To complete your registration, please verify your email address by entering the following one-time password (OTP): ${otpVerificationLink}</p>
            <h2>OTP: ${otp}</h2>
            <p>This OTP is valid for 2 minutes. If you didn't request this OTP, please ignore this email.</p>
            </div>

            <div class="email-footer">
            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </div>

        </body>
        </html>
        `;
  return template;
};

export default EmailVerifyOtpTemplate;
