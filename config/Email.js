import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const emailSend = async (user, subject, htmlTemplate) => {
  try {
    if (!user || !subject || !htmlTemplate) {
      throw new Error(
        "Missing required fields: user, subject, or htmlTemplate"
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.APP_NAME || "Md Mehedi Hasan",
      to: user.email,
      subject: subject,
      html: htmlTemplate,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error occurred while sending email:", error.message);
    throw error;
  }
};

export default emailSend;
