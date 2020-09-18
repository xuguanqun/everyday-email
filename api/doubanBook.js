const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const request = require('../utils/request');
const doubanBook = async () => {
  const url = 'https://book.douban.com/';
  const douban = await request(url);
  if (!douban) {
    return Promise.reject({
      url: url,
      title: '豆瓣读书-请求错误',
      date: new Date()
    });
  }
  try {
    const html = iconv.decode(douban, 'utf8');
    const $ = cheerio.load(html);
    const newBooks = []; // 新书
    const hotNews = []; // 热门新闻
    let bookTop = []; // 排行
    // 新书
    const itemA = $('.carousel > .slide-list > ul > li > .cover > a');
    const itemB = $('.carousel > .slide-list > ul > li > .cover > a > img');
    let num = Math.min(...[itemA.length, itemB.length]);
    if (num > 10) {
      num = 10;
    }
    for (let i = 0; i < num; i++) {
      newBooks[i] = {
        title: itemA[i].attribs.title,
        img_src: itemB[i].attribs.src,
        link: itemA[i].attribs.href
      };
    }
    // 新闻
    const itemC = $('.slide-block > ul > li > a');
    const itemD = $('.slide-block > ul > li > a > .cover');
    const itemE = $('.slide-block > ul > li > a > .content > .title');
    const itemF = $('.slide-block > ul > li > a > .content > .meta');
    const itemG = $('.slide-block > ul > li > a > .content > .abstract');
    let num2 = Math.min(
      ...[itemC.length, itemD.length, itemE.length, itemF.length, itemG.length]
    );
    if (num2 > 10) {
      num2 = 10;
    }
    for (let i = 0; i < num2; i++) {
      const style = itemD[i].attribs.style;
      const reg = style.match(/url\(.*\)/);
      const img_src =
        reg.length > 0 ? reg[0].substring(4, reg[0].length - 1) : '';

      hotNews[i] = {
        title: itemE[i].children[0].data,
        img_src: img_src,
        link: itemC[i].attribs.href,
        meta: itemF[i].children[0].data,
        content: itemG[i].children[0].data
      };
    }
    // 排行榜
    const itemH = $('.popular-books > .bd > ul > li > .cover > a > img');
    const itemI = $('.popular-books > .bd > ul > li > .info > .title > a');
    const itemJ = $('.popular-books > .bd > ul > li > .info > .author');
    const itemK = $(
      '.popular-books > .bd > ul > li > .info > .entry-star-small > .average-rating'
    );
    const itemL = $('.popular-books > .bd > ul > li > .info > .reviews');
    let num3 = Math.min(
      ...[itemH.length, itemI.length, itemJ.length, itemK.length, itemL.length]
    );
    if (num3 > 10) {
      num3 = 10;
    }
    for (let i = 0; i < num3; i++) {
      let _author = itemJ[i].children[0].data;
      _author = _author.replace(/作者：|\n|\s/g, '');
      let _content = itemL[i].children[0].data;
      _content = _content.replace(/\(|\n|\s/g, '');
      let _score = itemK[i].children[0].data;
      _score = _score.replace(/\n|\s/g, '');
      bookTop[i] = {
        title: itemI[i].children[0].data,
        img_src: itemH[i].attribs.src,
        link: itemI[i].attribs.href,
        author: _author,
        content: _content,
        score: _score
      };
    }
    bookTop = bookTop.sort((a,b)=> Number(b.score) - Number(a.score));
    return Promise.resolve({ newBooks, hotNews, bookTop });
  } catch (err) {
    return Promise.reject({
      url: url,
      title: '豆瓣读书-解析错误',
      msg: err,
      date: new Date()
    });
  }
};

module.exports = doubanBook;
