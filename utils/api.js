const {
  zhihuDaily,
  weiboTop,
  doubanMovie,
  doubanBook,
  weather,
  one,
  email,
  commemorationDay
} = require('../api');
const {
  card_zhihu,
  card_weibo,
  card_doubanMovie,
  card_one,
  card_doubanBook,
  card_weather,
  card_commemoration
} = require('../card');
const API = {
  天气: { func: weather, format: card_weather },
  纪念日: { func: commemorationDay, format: card_commemoration },
  知乎日报: { func: zhihuDaily, format: card_zhihu },
  微博热搜: { func: weiboTop, format: card_weibo },
  豆瓣电影: { func: doubanMovie, format: card_doubanMovie },
  豆瓣读书: { func: doubanBook, format: card_doubanBook },
  ONE: { func: one, format: card_one }
};

module.exports = API;
