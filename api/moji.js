const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const request = require("../utils/request");

const mojiWeather = async () => {
  const url = "https://s.moji.com/top/summary";
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
    let kongqi = $(".wea_alert>ul>li>a>span>img")[0]
      ? $(".wea_alert>ul>li>a>span>img")[0].attribs
      : false;
    let warning = $(".warning_aqi>a>span>img")[0]
      ? $(".warning_aqi>a>span>img")[0].attribs
      : false;
    let wendu = $(".wea_weather>em")[0]
      ? $(".wea_weather>em")[0].children[0].data
      : false;
    let wheather_type = $(".wea_weather>span>img")[0]
      ? $(".wea_weather>span>img")[0].attribs.alt
      : false;
    let wheather_img = $(".wea_weather>span>img")[0]
      ? $(".wea_weather>span>img")[0].attribs.src
      : false;
    let shidu = $(".wea_about>span")[0]
      ? $(".wea_about>span")[0].children[0].data
      : false;
    let fengxiang = $(".wea_about>em")[0]
      ? $(".wea_about>em")[0].children[0].data
      : false;
    let tips = $(".wea_tips>em")[0]
      ? $(".wea_tips>em")[0].children[0].data
      : false;
    const data = {
      背景: getBackground(wheather_type),
      温度: wendu,
      天气: wheather_type,
      图标: wheather_img,
      空气: kongqi,
      预警: warning,
      湿度: shidu && shidu.replace(/湿度/g, ""),
      风向: fengxiang,
      提示: tips,
    };
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
