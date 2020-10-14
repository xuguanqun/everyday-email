const { dataCard, interval } = require('./config/config.json');
const sendDataEmail = require('./utils/sendDataEmail');
const sendErrorEmail = require('./utils/sendErrorEmail');
const renderHtml = require('./utils/renderHtml');
const API = require('./utils/api');
const schedule = require('node-schedule');
(function start() {
  // default 8:00 everyday
  const timer = schedule.scheduleJob(interval || '00 00 08 * * *', () => {
    mission();
  });
})();
function mission() {
  const missionList = dataCard.map((key) => API[key].func());
  const mission = Promise.allSettled(missionList)
    .then((data) => {
      const successData = [];
      const errorData = [];
      data.forEach((e, i) => {
        if (e.status === 'fulfilled') {
          successData[i] = { title: dataCard[i], data: e.value };
        } else if (e.status === 'rejected') {
          errorData[i] = { title: dataCard[i], reason: e.reason };
        }
      });
      // console.log(successData, errorData);
      const fdata = formatData(successData);
      const html = renderHtml(fdata);
      const oneData = successData.filter((fil) => fil.title === 'ONE');
      const one = oneData.length > 0 ? oneData[0].data.title : null;
      sendDataEmail(html, one)
        .then((e) => console.log('邮件发送成功', e))
        .catch((err) => {
          console.error(err);
          setTimeout(() => {
            start();
          }, 2000);
        });
      errorData.length > 0 && sendErrorEmail(errorData);
    })
    .catch((err) => {
      console.error(err);
    });
}

function formatData(data) {
  const obj = {};
  data.map((v) => (obj[v.title] = v.data));
  const finalData = dataCard.map((key) => {
    const foo = API[key].format;
    const vdata = obj[key];
    return foo && foo(vdata);
  });
  return finalData;
}
