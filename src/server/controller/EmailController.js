const nodemailer = require('nodemailer');
require('dotenv').config();

const emailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASS,
  },
  debug: true,
};

const TRANSPORTER = nodemailer.createTransport(emailConfig);

const sendCodeEmail = (code, email) => {
  const mailOptions = {
    from: '"Dog Walkers 🐶" <dog.walkers.mail@gmail.com>',
    to: email,
    subject: 'Dog walkers activation code',
    text: `${code}`,
    html: `<b>${code}</b>`,
  };

  // send mail with defined transport object
  TRANSPORTER.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log(`Activation message sent to ${email}`);
  });
};

module.exports = {
  sendCodeEmail,
};
