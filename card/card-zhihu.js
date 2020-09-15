const card_zhihu = (data) => {
  let zhihu = "";
  data.map(
    (v3, index) =>
      (zhihu += `<div style="display: flex;justify-content: start;margin:7px 0;font-size:11px">
            <b style="display:block;color: #fff;background: #0084ff;width: 24px;height: 24px;text-align: center;border-radius: 50%;">${
              index + 1
            }</b>&ensp;
            <a style="color:#262626;text-decoration:none;font-size:16px" href="${
              v3.title_link
            }">${v3.title}</a>
        </div>`)
  );
  return `<div class="card">${zhihu}</div>`;
};
module.exports = card_zhihu;
