const renderTabs = require('../utils/renderTabs');
const renderCard = require('../utils/renderCard');
const { doubanIcon } = require('../utils/icon');
const card_doubanBook = ({ newBooks, hotNews, bookTop }) => {
  let d_content1 = '';
  let d_content2 = '';
  let d_content3 = '';
  newBooks.map(
    (v, index) =>
      (d_content1 += `<a href="${v.link}" style="display:block;text-align:center;width:70px;text-decoration: none;float:left;margin:0px 5px;">
          <div style="height:100px;position: relative;">
            <img src="${v.img_src}" width="100%" style="position: absolute;bottom: 0;left: 0;" />
          </div>
          <span style="color:#111;font-size:11px">${v.title}</span>
        </a>`)
  );
  hotNews.map(
    (v, index) =>
      (d_content2 += `<a href="${v.link}" style="display:inline-block;text-decoration: none;height:100px;width:340px;margin:5px 0px;overflow: hidden;">
          <span style="float:left;width:45%;height:100%;">
              <img src="${v.img_src}" height="100%" width="100%" style="border-radius:5px;object-fit: contain;" />
          </span>
          <span style="float:right;width:54%;height:100%;">
          <div style="color:#111;font-size:12px;font-weight:bold;margin-bottom:3px;-webkit-box-orient: vertical;-webkit-line-clamp: 2;display: -webkit-box;overflow: hidden;">${v.title}</div>
          <p style="color:#262626;font-size:11px;-webkit-box-orient: vertical;-webkit-line-clamp: 3;display: -webkit-box;overflow: hidden;">${v.content}</p>
          </span>
        </a>`)
  );
  bookTop.map(
    (v, index) =>
      (d_content3 += `<a href="${v.link}" style="display:inline-block;text-decoration: none;height:110px;width:340px;margin:5px 0px;overflow: hidden;">
            <span style="float:left;width:24%;height:100%;">
                <img src="${v.img_src}" width="100%" style="border-radius:5px" />
            </span>
            <span style="float:right;width:75%;height:100%;">
            <div style="color:#111;font-size:12px;font-weight:bold;margin-bottom:3px;">${v.title}</div>
            <div style="color:#7e7e7e;font-size:10px">${v.author}</div>
            <div style="color:#e09015;font-size:10px">${v.score}</div>
            <p style="color:#262626;font-size:11px">${v.content}</p>
            </span>
          </a>`)
  );
  const content1 = `<div style="overflow-x: auto;width: ${
    80 * newBooks.length
  }px;height: 100%;">${d_content1}</div>`;
  const content2 = `<div style="margin-top:10px;padding:5px;overflow-x: auto;height: 130px;width: ${
    340 * hotNews.length
  }px;">${d_content2}</div>`;
  const content3 = `<div style="margin-top:10px;padding:5px;overflow-x: auto;height: 130px;width: ${
    340 * bookTop.length
  }px;">${d_content3}</div>`;
  const obj = {
    新书速递: content1,
    图书资讯: content2,
    最受关注: content3
  };
  const doubanBook = renderTabs('bookTab', obj, 200);
  return renderCard('豆瓣读书', '#00B51D', doubanBook, '', doubanIcon);
};
module.exports = card_doubanBook;
