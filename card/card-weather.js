const renderCard = require('../utils/renderCard');
const card_weather = ({
  address,
  airLabel,
  airImg,
  temperature,
  high_low,
  temperatureImg,
  temperatureTxt,
  updateTime,
  wet,
  wind,
  tips,
  background
}) => {
  let address_dom = '';
  address.map((v) => (address_dom += `<span class="tag-black">${v}</span>`));
  let weather = `<div style="padding:5px;color:#fff;background:url(${background});background-size: 100%;background-repeat: no-repeat;">
  <div style="display: flex;justify-content: space-between;">
  <span>${address_dom}</span>
    <em style="font-size:12px">${updateTime}</em>
  </div>
  <div style="display: flex;justify-content: space-around;align-items: center;">
    <div style="width:25%;text-align:center"><b style="font-size:50px;position: relative;" class="temperature">${temperature}</b></div>
    <div style="width:20%;text-align:center">
        <img src="${temperatureImg}" width="50px" height="50px" />
    </div>
    <div style="width:20%;text-align:center;font-size:15px">
        <div>${temperatureTxt}</div>
        <div style="margin-top:5px;">${high_low}</div>
    </div>
    <div style="width:25%;padding-left: 15px;font-size:14px">
        <div>${wet}</div>
        <div>${wind}</div>
        <div>
            <img src="${airImg}" width="13px" />
            <span>${airLabel}</span>
        </div>
    </div>
  </div>
  <div style="margin-top:10px;font-size:15px">
  <span class="tag-opacity">今日天气提示</span>
  <span>${tips}</span>
  </div>
    </div>`;
  return renderCard('天气', '#000', weather);
};
module.exports = card_weather;
