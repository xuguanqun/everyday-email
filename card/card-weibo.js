const renderCard = require('../utils/renderCard');
const { weiboIcon } = require('../utils/icon');
const weiboTop = require('../api/weiboTop');
const card_weibo = (data) => {
  let weibo = '';
  data.map(
    (v, index) =>
      (weibo += `<div style="display: flex;justify-content: start;align-items:center;margin:7px 0;font-size:11px">
              <b style="display:block;color: #fff;background: ${
                index === 0
                  ? '#FF5722'
                  : index === 1
                  ? '#FF9800'
                  : index === 2
                  ? '#FFC107'
                  : '#BDBDBD'
              };width: 20px;height: 20px;text-align: center;line-height:20px;border-radius: 50%;">${
        index + 1
      }</b>&ensp;
              <a style="color:#262626;text-decoration:none;font-size:14px;width:90%" href="${
                v.title_link
              }">${v.title}</a>
          </div>`)
  );
  return renderCard('微博热搜', '#eb7350', weibo, 'weiboCard', weiboIcon);
};
module.exports = card_weibo;
