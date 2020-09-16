const card_weibo = (data) => {
  const title = '微博热搜';
  const color = '#eb7350';
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
              };width: 24px;height: 24px;text-align: center;line-height:23px;border-radius: 50%;">${
        index + 1
      }</b>&ensp;
              <a style="color:#262626;text-decoration:none;font-size:16px;width:90%" href="${
                v.title_link
              }">${v.title}</a>
          </div>`)
  );
  return `<div class="card">
    <div class="title" style="border-color:${color}">${title}</div>
    ${weibo}
    </div>`;
};
module.exports = card_weibo;
