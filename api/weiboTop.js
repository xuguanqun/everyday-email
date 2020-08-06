const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const request = require("../utils/request");
const weiboTop = async () => {
  const url = "https://s.weibo.com/top/summary";
  const weibo = await request(url);
  if (!weibo) {
    return Promise.reject({
      url: url,
      title: "微博热搜-请求错误",
      date: new Date(),
    });
  }
  try {
    const html = iconv.decode(weibo, "utf8");
    const $ = cheerio.load(html);
    let tag_a = $("td>a");
    const data = [];
    for (let i = 0; i < 10; i++) {
      var o = { 0: "#f5222d", 1: "#fa541c", 2: "#fa8c16" };
      data.push({
        title: tag_a[i].children[0].data,
        title_link: "https://s.weibo.com" + tag_a[i].attribs.href,
        color: o[i] || "#8c8c8c",
      });
    }
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject({
      url: url,
      title: "微博热搜-解析错误",
      msg: err,
      date: new Date(),
    });
  }
};

module.exports = weiboTop;
