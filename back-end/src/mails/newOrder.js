//راه اندازی پکیج nodemailer
const nodemailer = require("nodemailer");

const sendEmail = (subject, address, content) => {
  const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: address,
    subject: subject,
    html: content,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error", error);
    } else {
      console.log("success", info.response);
    }
  });
};

module.exports = sendEmail;
