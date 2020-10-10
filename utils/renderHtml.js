const commCss = `/* 公共样式 */
.tag-black{
  color:#fff;
  background:#000;
  border-radius:5px;
  margin:0px 3px;
  padding:0px 5px;
}
.tag-opacity{
  color:#fff;
  background:rgba(255,255,255,.2);
  border-radius:5px;
  margin:0px 5px;
  padding:0px 5px;
}
.temperature::before {
  position: absolute;
  top: 0px;
  right: -15px;
  font-size: 35px;
  content: '°';
}
.today{
  font-size:15px;
  font-weight:400;
  width:73px;
  background: linear-gradient(to right, #722ed1, #1890ff);
  -webkit-background-clip: text;
  color: transparent;
}
`;
const tabCss = `/* tab栏样式 */
.tab .tab-item {
  list-style: none;
  position: relative;
}
.tab .tab-item input {
  display: none;
}
.tab .tab-item label {
  margin: 0px 3px;
  float: left;
  width: 100px;
  text-align: center;
  line-height: 31px;
  border-right: 0;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s;
  color: #111;
  border-radius: 5px 5px 0px 0px;
  border: 1px solid #eee;
  font-size: 12px;
}
.tab .tab-item input:checked + label {
  color: #fff;
  background: #4395ff;
  border-bottom: 1px solid #4395ff;
}
.tab .tab-item:last-child label {
  border-right: 1px solid #eee;
}
.tab .tab-item .content {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 32px;
  width: 100%;
  padding: 5px;
  font-size: 14px;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  transition: all .3s;
  height: 268px;
  overflow-y: auto;
}
.tab .tab-item input:checked ~ .content {
  opacity: 1;
  visibility: visible;
}`;
const cardCss = `/* 卡片样式 */
.card{
  margin: 10px 0px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #111;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  transition: all .3s;
  position: relative;
}
.card-title{
  margin-bottom: 10px;
  padding-left: 5px;
  border-left: 8px solid;
  border-color: #eee;
  color: #757575;
  font-size: 13px;
  display:flex;
  align-items:center;
}
.card input {
  display: none;
}
.card-content {
  height: 150px;
  overflow: hidden;
  transition: height .3s;
}
.label-hide {
  display: none;
}
.label-show,.label-hide {
  color: #212121;
  font-size: 13px;
  position: absolute;
  right: 5px;
  top: 3px;
}
.show:checked ~ .card-content {
  height: 100%;
}
.hide:checked ~ .card-content {
  height: 150px;
}
.show:checked ~ .label-show {
  display: none;
}
.show:checked ~ .label-hide {
  display: inline;
}`;
const renderHtml = (data) => {
  let div = '';
  data.map((str) => str && (div += str));
  return `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        ${commCss}
        ${tabCss}
        ${cardCss}
      </style>
    </head>
    <body>
      ${div}
    </body>
  </html>
  `;
};
module.exports = renderHtml;
