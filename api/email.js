const nodemailer = require("nodemailer");
const { mailOption } = require("../config");
const sendEmail = async ({ sendOption }) => {
  const transporter = nodemailer.createTransport({ mailOption });
  transporter.sendMail(sendOption, (error, info) => {
    if (error) {
      return Promise.reject({ msg: error, date: new Date() });
    } else {
      console.log("发送成功", info);
    }
  });
};

module.exports = sendEmail;
