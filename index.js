const {
  zhihuDaily,
  weiboTop,
  doubanMovie,
  mojiWeather,
  one,
  email,
} = require("./api/index");
const { myEmail, errorEmail } = require("./config");
(async function () {
  const test = await zhihuDaily().catch((err) => console.error("err", err));
  const test2 = await weiboTop().catch((err) => console.error("err", err));
  const test3 = await doubanMovie().catch((err) => {
    sendErrorEmail(err);
  });
  const test4 = await mojiWeather().catch((err) => {
    debugger;
  });
  const test5 = await one();
})();

const sendErrorEmail = async ({title,msg}) => {
  const send = await email({
    from: myEmail.address,
    to: errorEmail.address,
    subject: title,
    html: `<div>
    <div>${msg && JSON.stringify(msg)}</div>
    </div>`,
  });
  debugger;
};
