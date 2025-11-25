const nodeMailer = require("nodemailer");

const sendMail = ({ subject, content, code, emailTo }) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_PASSCODE,
    },
  });

  const message = {
    from: '"SmartSave" <no-reply@smartsave.com>',
    to: emailTo,
    subject: subject,
    html: `
        <div>
            <h1>Dear Customer,</h1><br>
            <p>${content} ${code}</p>
        </div>
    `,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("email sent", info.response);
    }
  });
};


module.exports = sendMail;