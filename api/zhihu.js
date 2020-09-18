const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const request = require('../utils/request');
const zhihuDaily = async () => {
  const url = 'http://daily.zhihu.com/';
  const zhihu = await request(url);
  if (!zhihu) {
    return Promise.reject({
      url: url,
      title: '知乎日报-请求错误',
      date: new Date()
    });
  }
  try {
    const html = iconv.decode(zhihu, 'utf8');
    const $ = cheerio.load(html);
    const daily_href = $('.main-content-wrap>.row>div>.wrap>.box>a');
    const daily_title = $('.main-content-wrap>.row>div>.wrap>.box>a>span');
    const daily_img = $('.main-content-wrap>.row>div>.wrap>.box>a>img');
    const data = [];
    let num = Math.min(
      ...[daily_href.length, daily_title.length, daily_img.length]
    );
    if (num > 10) {
      num = 10;
    }
    for (let i = 0; i < num; i++) {
      data.push({
        title: daily_title[i].children[0].data,
        img_src: daily_img[i].attribs.src,
        title_link: 'http://daily.zhihu.com' + daily_href[i].attribs.href
      });
    }
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject({
      url: url,
      title: '知乎日报-解析错误',
      msg: err,
      date: new Date()
    });
  }
};

module.exports = zhihuDaily;
