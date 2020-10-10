const renderCard = require('../utils/renderCard');
const { zhihuIcon } = require('../utils/icon');
const card_zhihu = (data) => {
  let zhihu = '';
  data.map(
    (v, index) =>
      (zhihu += `<div style="display: flex;justify-content: start;align-items:center;margin:7px 0;font-size:11px">
            <b style="display:block;color: #fff;background: #0084ff;width: 20px;height: 20px;text-align: center;line-height:20px;border-radius: 50%;">${
              index + 1
            }</b>&ensp;
            <a style="color:#262626;text-decoration:none;font-size:14px;width:90%" href="${
              v.title_link
            }">${v.title}</a>
        </div>`)
  );
  return renderCard('知乎日报', '#0084ff', zhihu, 'zhihuCard', zhihuIcon);
};
module.exports = card_zhihu;
