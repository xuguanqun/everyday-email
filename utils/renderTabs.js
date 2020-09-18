const renderTabs = (name, obj, height = 150) => {
  let dom = '';
  let i = 0;
  for (key in obj) {
    const data = obj[key];
    dom += `<div class="tab-item">
    <input id="${name}${i + 1}" type="radio" name="${name}" ${
      i === 0 ? 'checked' : ''
    } />
    <label for="${name}${i + 1}">${key}</label>
    <div class="content">${data}</div>
</div>`;
    i++;
  }
  return `<div class="tab" style="height:${height}px">${dom}</div>`;
};
module.exports = renderTabs;
