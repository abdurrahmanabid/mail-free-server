const nodemailer = require("nodemailer");
const Mail = require("../model/Mail");
require("dotenv").config(); // Load environment variables

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD, // Use App Password or OAuth2
    },
});

const sendMail = async (req, res) => {
    try {
        // Validate environment variables
        if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
            throw new Error("Email credentials are missing in environment variables.");
        }

        // Extract fields from request body
        const { to, subject, text } = req.body;

        // Validate required fields
        if (!to || !subject || !text) {
            return res.status(400).json({ error: "Missing required fields: to, subject, or text." });
        }

        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to,
            subject,
            text,
        };

        // Send email using Nodemailer
        await transporter.sendMail(mailOptions);

        // Save email details to MongoDB
        const savedMail = await Mail.create({ to, subject, text });

        res.status(200).json({
            message: "Mail sent successfully!",
            status:200,
            mail: savedMail, // Return the saved email record
        });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: error.message || "Failed to send mail" , status:500});
    }
};

module.exports = { sendMail };
