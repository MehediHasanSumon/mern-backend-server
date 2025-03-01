const SentForgotPasswordLinkTemplate = (user, resetPasswordLink, app_name) => {
  const template = `<!DOCTYPE html>
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f9f9f9;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                max-width: 600px;
                                margin: 50px auto;
                                background-color: #ffffff;
                                border: 1px solid #ddd;
                                border-radius: 8px;
                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                padding: 20px;
                            }
                            .header {
                                text-align: center;
                                font-size: 24px;
                                color: #333333;
                                margin-bottom: 20px;
                            }
                            .content {
                                font-size: 16px;
                                color: #555555;
                                line-height: 1.5;
                            }
                            .footer {
                                font-size: 14px;
                                color: #888888;
                                margin-top: 30px;
                            }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                            <div class="header">Reset Your Password</div>
                            <div class="content">
                                <p>Dear <strong>${user.name}</strong>,</p>
                                <p>
                                We received a request to reset the password for your account
                                associated with <strong>${user.email}</strong>. If you made this
                                request, please click the link below to reset your password:
                                </p>

                                <a href="${resetPasswordLink}">${resetPasswordLink}</a>

                                <p>
                                If you didn’t request a password reset, you can safely ignore this
                                email. Your account is secure, and no changes will be made.
                                </p>
                                <p>For any assistance, feel free to contact our support team.</p>
                            </div>
                            <div class="footer">
                                Best regards,<br />
                                ${app_name}<br />
                            </div>
                            </div>
                        </body>
                        </html>
                        `;
  return template;
};

export default SentForgotPasswordLinkTemplate;
