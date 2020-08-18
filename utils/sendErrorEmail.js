const {
  mailOption: { auth },
  errorEmail,
} = require("../config/config.json");
const { email } = require("../api");
// 发送错误信息邮件
const sendErrorEmail = async ({ title, msg, date }) => {
  const send = await email({
    from: auth.user,
    to: errorEmail.address,
    subject: title,
    html: `<div>
    ${
      msg &&
      msg.message &&
      `<span style="font-size:14px;color:#333">message</span>
      <pre style="font-size:12px;color:#666">${msg.message}</pre>`
    }
    <br />
    ${
      msg &&
      msg.stack &&
      `<span style="font-size:14px;color:#333">stack</span>
      <pre style="font-size:12px;color:#666">${msg.stack}</pre>`
    }
    <br />
    ${
      date &&
      `<span style="font-size:14px;color:#333">date</span>
      <pre style="font-size:12px;color:#666">${date}</pre>`
    }
    </div>`,
  });
};
module.exports = sendErrorEmail;
