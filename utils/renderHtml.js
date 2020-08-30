const renderHtml = (data) => {
  let html = "";
  data.map((str) => str && (html += str));
  return html;
};
module.exports = renderHtml;
