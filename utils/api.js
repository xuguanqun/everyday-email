const {
  zhihuDaily,
  weiboTop,
  doubanMovie,
  mojiWeather,
  one,
  email,
} = require("../api");
const { card_zhihu } = require("../card");
const API = {
  墨迹天气: { func: mojiWeather },
  知乎日报: { func: zhihuDaily, format: card_zhihu },
  微博热搜: { func: weiboTop },
  豆瓣电影: { func: doubanMovie },
  one: { func: one },
};

module.exports = API;
