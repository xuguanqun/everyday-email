const card_one = (data) => {
  const { title, img_src } = data;
  const _title = 'one';
  const color = '#eb7350';
  let one = `<div style="padding:5px;text-align:center;">
      <div style="width:70%;margin:0 auto;">
        <img src='${img_src}' height="100%" width="100%" style="border-radius:5px" />
      </div>
      <span style="font-size:12px">${title}</span>
    </div>`;
  return `<div class="card">
      <div class="title" style="border-color:${color}">${_title}</div>
      ${one}
      </div>`;
};
module.exports = card_one;
