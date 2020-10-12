const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const request = require('../utils/request');
const One = async () => {
  const url = 'http://wufazhuce.com/';
  const one = await request(url);
  if (!one) {
    return Promise.reject({
      url: url,
      title: 'ONE-请求错误',
      date: new Date()
    });
  }
  try {
    const html = iconv.decode(one, 'utf8');
    const $ = cheerio.load(html);
    let img_src = $('.fp-one-imagen')[0].attribs.src;
    let title = $('.fp-one-cita>a')[0].children[0].data;
    const data = { img_src, title };
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject({
      url: url,
      title: 'ONE-解析错误',
      msg: err,
      date: new Date()
    });
  }
};

module.exports = One;
