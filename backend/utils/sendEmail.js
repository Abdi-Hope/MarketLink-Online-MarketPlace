const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    console.log(`Using email service: ${process.env.EMAIL_SERVICE} as ${process.env.EMAIL_USER}`);
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"MarketLink" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
