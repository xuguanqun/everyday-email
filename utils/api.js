const {
  zhihuDaily,
  weiboTop,
  doubanMovie,
  doubanBook,
  mojiWeather,
  one,
  email
} = require('../api');
const { card_zhihu, card_weibo } = require('../card');
const API = {
  墨迹天气: { func: mojiWeather },
  知乎日报: { func: zhihuDaily, format: card_zhihu },
  微博热搜: { func: weiboTop, format: card_weibo },
  豆瓣电影: { func: doubanMovie },
  豆瓣读书: { func: doubanBook },
  one: { func: one }
};

module.exports = API;
