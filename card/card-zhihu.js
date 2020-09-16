const card_zhihu = (data) => {
  const title = '知乎日报';
  const color = '#0084ff';
  let zhihu = '';
  data.map(
    (v, index) =>
      (zhihu += `<div style="display: flex;justify-content: start;align-items:center;margin:7px 0;font-size:11px">
            <b style="display:block;color: #fff;background: #0084ff;width: 24px;height: 24px;text-align: center;line-height:23px;border-radius: 50%;">${
              index + 1
            }</b>&ensp;
            <a style="color:#262626;text-decoration:none;font-size:16px;width:90%" href="${
              v.title_link
            }">${v.title}</a>
        </div>`)
  );
  return `<div class="card">
  <div class="title" style="border-color:${color}">${title}</div>
  ${zhihu}
  </div>`;
};
module.exports = card_zhihu;
