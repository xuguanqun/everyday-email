const {
  mailOption: { auth },
  sendEmail
} = require('../config/config.json');
const { email } = require('../api');
// 发送邮件
const sendDataEmail = async (html, title = '每日邮件') => {
  const send = await email({
    from: auth.user,
    to: sendEmail.address,
    subject: sendEmail.subject || title,
    html: html
  });
  return send;
};
module.exports = sendDataEmail;
