const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const request = require("../utils/request");

const mojiWeather = async () => {
  const url = "https://m.moji.com";
  const moji = await request(url);
  if (!moji) {
    return Promise.reject({
      url: url,
      title: "墨迹天气-请求错误",
      date: new Date(),
    });
  }
  try {
    const html = iconv.decode(moji, "utf8");
    const $ = cheerio.load(html);
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject({
      url: url,
      title: "墨迹天气-解析错误",
      msg: err,
      date: new Date(),
    });
  }
};

const getBackground = (f_str_weather) => {
  let background = "https://h5tq.moji.com/tianqi/assets/images/skin/day_0.jpg"; //默认 晴
  let _obj = [
    {
      weather: "晴",
      img: "https://h5tq.moji.com/tianqi/assets/images/skin/day_0.jpg",
    },
    {
      weather: "阴",
      img: "https://h5tq.moji.com/tianqi/assets/images/skin/day_1.jpg",
    },
    {
      weather: "雨",
      img: "https://h5tq.moji.com/tianqi/assets/images/skin/day_3.jpg",
    },
    {
      weather: "雷",
      img: "https://h5tq.moji.com/tianqi/assets/images/skin/day_4.jpg",
    },
    {
      weather: "雪",
      img: "https://h5tq.moji.com/tianqi/assets/images/skin/day_13.jpg",
    },
    {
      weather: "雾",
      img: "https://h5tq.moji.com/tianqi/assets/images/skin/day_18.jpg",
    },
    {
      weather: "沙",
      img: "https://h5tq.moji.com/tianqi/assets/images/skin/day_20.jpg",
    },
    {
      weather: "霾",
      img: "https://h5tq.moji.com/tianqi/assets/images/skin/day_45.jpg",
    },
  ];
  _obj.map((v) => {
    if (f_str_weather.indexOf(v.weather) !== -1) {
      //符合
      background = v.img;
    }
  });
  return background;
};
module.exports = mojiWeather;
