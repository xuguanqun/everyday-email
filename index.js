const { dataCard } = require('./config/config.json');
const sendDataEmail = require('./utils/sendDataEmail');
const sendErrorEmail = require('./utils/sendErrorEmail');
const renderHtml = require('./utils/renderHtml');
const API = require('./utils/api');
const FS = require('fs');
(async function () {
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
      console.log(successData, errorData);
      const fdata = formatData(successData);
      const html = renderHtml(fdata);
      FS.writeFile('./yanshi.html', html, function (err) {
        console.log(err);
      });
      // sendDataEmail(html).then((e) => console.log(e));
      // .catch((err) => console.error(err));
      // sendErrorEmail(errorData);
    })
    .catch((err) => {
      debugger;
    });
})();

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
