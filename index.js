const {
  zhihuDaily,
  weiboTop,
  doubanMovie,
  mojiWeather,
  one,
  email,
} = require("./api");
const { card_zhihu } = require("./card");
const sendErrorEmail = require("./utils/sendErrorEmail");
const {
  mailOption: { auth },
  sendEmail,
  errorEmail,
} = require("./config/config.json");
(async function () {
  const zhihu = await zhihuDaily().catch((err) => sendErrorEmail(err));
  const html_zhihu = card_zhihu(zhihu);
  
  const weibo = await weiboTop().catch((err) => sendErrorEmail(err));
  const douban = await doubanMovie().catch((err) => sendErrorEmail(err));
  const moji = await mojiWeather().catch((err) => sendErrorEmail(err));
  const One = await one().catch((err) => sendErrorEmail(err));
})();
