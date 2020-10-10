const renderCard = (title, color, data, cardKey, icon) => {
  const showOhide = cardKey
    ? `<input id="${cardKey}-show" class="show" type="radio" name="${cardKey}" />
    <input id="${cardKey}-hide" class="hide" type="radio" name="${cardKey}" />
    <label class="label-show" for="${cardKey}-show">展开</label>
    <label class="label-hide" for="${cardKey}-hide">收起</label>`
    : '';
  return cardKey
    ? `<div class='card'>
      <div class='card-title' ${
        !icon ? `style='border-color:${color}'` : `style='border:none'`
      }>
        ${icon || ''}&ensp;${title}
      </div>
      ${showOhide}
      <div class='card-content'>${data}</div>
    </div>`
    : `<div class='card'>
    <div class='card-title' ${
      !icon ? `style='border-color:${color}'` : `style='border:none'`
    }>
    ${icon || ''}&ensp;${title}
    </div>
    ${data}
  </div>`;
};
module.exports = renderCard;
