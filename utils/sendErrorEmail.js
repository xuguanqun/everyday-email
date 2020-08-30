const {
  mailOption: { auth },
  errorEmail,
} = require("../config/config.json");
const { email } = require("../api");
// 发送错误信息邮件
const sendErrorEmail = async (errorList) => {
  let html = "";
  errorList.map(({ title, reason: { msg, date } }) => {
    html += `<div>
    <h3>${title}</h3>
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
    </div>`;
  });
  const send = await email({
    from: auth.user,
    to: errorEmail.address,
    subject: "每日邮件-错误提醒",
    html: html,
  });
};
module.exports = sendErrorEmail;
