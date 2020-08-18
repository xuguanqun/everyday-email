const nodemailer = require("nodemailer");
const { mailOption } = require("../config/config.json");

const email = (sendOption) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(mailOption);
    transporter.sendMail(sendOption, (error, info) => {
      if (error) {
        reject({ ret: false, msg: error, date: new Date() });
      } else {
        resolve({ ret: true, msg: info, date: new Date() });
      }
    });
  });
};
module.exports = email;
