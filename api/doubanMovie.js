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
    let item = $(".ui-slide-item>ul>.poster>a>img");
    let item_a = $(".ui-slide-item>ul>.poster>a");
    let item_time = $(".ui-slide-item>ul>.release-date");
    let len = [item.length, item_a.length, item_time.length];
    let max = Math.max(...len);
    let num = max < 10 ? max : 10;
    const data = [];
    for (let i = 0; i < num; i++) {
      data.push({
        title: item[i].attribs.alt,
        img_src: item[i].attribs.src,
        title_link: item_a[i].attribs.href,
        time: item_time[i].firstChild.data,
      });
    }
    var res = data.map((v) => {
      var o = v;
      if (!v.time) return "";
      var y = new Date().getFullYear();
      var m = v.time.indexOf("月");
      var d = v.time.indexOf("日");
      var mm = v.time.substring(m - 2, m);
      var dd = v.time.substring(d - 2, d);
      o.time2 = `${y}-${mm}-${dd}`;
      return o;
    });
    res.sort((a, b) => new Date(a.time2) - new Date(b.time2));
    return Promise.resolve(res);
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
