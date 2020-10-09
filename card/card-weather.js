const renderCard = require('../utils/renderCard');
const card_weather = ({
  address,
  airLabel,
  airImg,
  temperature,
  temperatureImg,
  temperatureTxt,
  updateTime,
  wet,
  wind,
  tips
}) => {
  debugger;
  let weather = `<div style="padding:5px;">
  <div style="display: flex;justify-content: space-between;">
    <span>${address}</span>
    <em>${updateTime}</em>
  </div>
  <div style="display: flex;justify-content: flex-start;align-items: center;">
    <div style="width:20%;text-align:center"><b style="font-size:50px">${temperature}</b></div>
    <div style="width:20%;text-align:center">
        <div><img src="${temperatureImg}" width="50px" height="50px" />
        <span>${temperatureTxt}</span></div>
    </div>
    <div style="width:20%;">${wet}</div>
    <div style="width:20%;">${wind}</div>
  </div>
    </div>`;
  return renderCard('天气', '#000', weather);
};
module.exports = card_weather;
