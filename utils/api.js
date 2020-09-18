const {
  zhihuDaily,
  weiboTop,
  doubanMovie,
  doubanBook,
  mojiWeather,
  one,
  email
} = require('../api');
const {
  card_zhihu,
  card_weibo,
  card_doubanMovie,
  card_one,
  card_doubanBook
} = require('../card');
const API = {
  墨迹天气: { func: mojiWeather },
  知乎日报: { func: zhihuDaily, format: card_zhihu },
  微博热搜: { func: weiboTop, format: card_weibo },
  豆瓣电影: { func: doubanMovie, format: card_doubanMovie },
  豆瓣读书: { func: doubanBook, format: card_doubanBook },
  one: { func: one, format: card_one }
};

module.exports = API;
