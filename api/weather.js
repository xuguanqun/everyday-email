const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const request = require('../utils/request');
const { address } = require('../config/config.json');
const getBackground = (f_str_weather, time = 'day') => {
  let background = `https://h5tq.moji.com/tianqi/assets/images/skin/${time}_0.jpg`; //默认 晴
  let _obj = [
    {
      weather: '晴',
      img: `https://h5tq.moji.com/tianqi/assets/images/skin/${time}_0.jpg`
    },
    {
      weather: '云',
      img: `https://h5tq.moji.com/tianqi/assets/images/skin/${time}_1.jpg`
    },
    {
      weather: '阴',
      img: `https://h5tq.moji.com/tianqi/assets/images/skin/${time}_1.jpg`
    },
    {
      weather: '雨',
      img: `https://h5tq.moji.com/tianqi/assets/images/skin/${time}_3.jpg`
    },
    {
      weather: '雷',
      img: `https://h5tq.moji.com/tianqi/assets/images/skin/${time}_4.jpg`
    },
    {
      weather: '雪',
      img: `https://h5tq.moji.com/tianqi/assets/images/skin/${time}_13.jpg`
    },
    {
      weather: '雾',
      img: `https://h5tq.moji.com/tianqi/assets/images/skin/${time}_18.jpg`
    },
    {
      weather: '沙',
      img: `https://h5tq.moji.com/tianqi/assets/images/skin/${time}_20.jpg`
    },
    {
      weather: '霾',
      img: `https://h5tq.moji.com/tianqi/assets/images/skin/${time}_45.jpg`
    }
  ];
  _obj.map((v) => {
    if (f_str_weather.indexOf(v.weather) !== -1) {
      //符合
      background = v.img;
    }
  });
  return background;
};

const weather = async () => {
  const url = `https://tianqi.moji.com/weather/${address}`;
  const moji = await request(url);
  if (!moji) {
    return Promise.reject({
      url: url,
      title: '天气-请求错误',
      date: new Date()
    });
  }
  try {
    const html = iconv.decode(moji, 'utf8');
    const $ = cheerio.load(html);
    const address = $('.search_default > em')[0].children[0].data;
    const air = $('.wea_alert > ul > li > a > span > img')[0].attribs;
    const temperature = $('.wea_weather > em')[0].children[0].data;
    const temperatureImg = $('.wea_weather > span > img')[0].attribs;
    const updateTime = $('.wea_weather > .info_uptime')[0].children[0].data;
    const wet = $('.wea_about > span')[0].children[0].data;
    const wind = $('.wea_about > em')[0].children[0].data;
    const tips = $('.wea_tips em')[0].children[0].data;
    const high_low = $('.forecast > ul > li')[2].children[0].data;
    // const canvas = $('.canvas > .canvas_box').html();
    const _address = address.replace(/\s/g, '');
    const data = {
      address: _address.split('，').reverse(),
      airLabel: air.alt,
      airImg: air.src,
      temperature,
      high_low,
      temperatureImg: temperatureImg.src,
      temperatureTxt: temperatureImg.alt,
      updateTime,
      wet,
      wind,
      tips,
      background: getBackground(
        temperatureImg.alt,
        new Date().getHours() > 5 && new Date().getHours() < 17
          ? 'day'
          : 'night'
      )
    };
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject({
      url: url,
      title: '天气-解析错误',
      msg: err,
      date: new Date()
    });
  }
};
module.exports = weather;
