const { commemoration } = require('../config/config.json');
const moment = require('moment');
const commemorationDay = () => {
  const data = commemoration
    .map((item) => {
      const nowB = `${moment().year()}-${item.date}`;
      item.diff = moment(nowB).diff(moment().format('YYYY-MM-DD'), 'day');
      return item;
    })
    .filter((fil) => fil.diff >= 0 && fil.advance >= fil.diff);
  data.sort((a, b) => a.diff - b.diff);
  return Promise.resolve({ data });
};
module.exports = commemorationDay;
