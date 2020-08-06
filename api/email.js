const nodemailer = require("nodemailer");
const { mailOption } = require("../config");
const sendEmail = async ({ sendOption }) => {
  const transporter = nodemailer.createTransport({ mailOption });
  transporter.sendMail(sendOption, (error, info) => {
    if (error) {
      return Promise.reject({ ret: false, msg: error, date: new Date() });
    } else {
      return Promise.resolve({ ret: true, msg: info, date: new Date() });
    }
  });
};

module.exports = sendEmail;
