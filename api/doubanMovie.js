const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const request = require("../utils/request");
const doubanMovie = async () => {
  const url = "https://movie.douban.com/";
  const douban = await request(url);
  if (!douban) {
    return Promise.reject({
      url: url,
      title: "豆瓣电影-请求错误",
      date: new Date(),
    });
  }
  try {
    const html = iconv.decode(douban, "utf8");
    const $ = cheerio.load(html);
    // 院线热映
    let item = $(".ui-slide-item>ul>.poster>a>img");
    let item_a = $(".ui-slide-item>ul>.poster>a");
    let len = [item.length, item_a.length];
    let max = Math.max(...len);
    let num = max < 10 ? max : 10;
    const data = [];
    for (let i = 0; i < num; i++) {
      data[i]={
        title: item[i].attribs.alt,
        img_src: item[i].attribs.src,
        link: item_a[i].attribs.href
      };
    }
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject({
      url: url,
      title: "豆瓣电影-解析错误",
      msg: err,
      date: new Date(),
    });
  }
};

module.exports = { doubanMovie };
