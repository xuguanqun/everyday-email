const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const request = require('../utils/request');
const doubanMovie = async () => {
  const url = 'https://movie.douban.com/';
  const douban = await request(url);
  if (!douban) {
    return Promise.reject({
      url: url,
      title: '豆瓣电影-请求错误',
      date: new Date()
    });
  }
  try {
    const html = iconv.decode(douban, 'utf8');
    const $ = cheerio.load(html);
    const isScreen = []; // 正在热议
    const hotNews = []; // 热门新闻
    const hotcomment = []; // 热门评论
    // 院线热映
    const item = $('.ui-slide-item>ul>.poster>a>img');
    const item_a = $('.ui-slide-item>ul>.poster>a');
    const len = [item.length, item_a.length];
    const max = Math.min(...len);
    const num = max < 10 ? max : 10;
    for (let i = 0; i < num; i++) {
      isScreen[i] = {
        title: item[i].attribs.alt,
        img_src: item[i].attribs.src,
        link: item_a[i].attribs.href
      };
    }
    // 影片新闻
    const itemA = $('.ui-slide-item>.gallery-frame>a');
    const itemB = $('.ui-slide-item>.gallery-frame>a>img');
    const itemBB = $(
      '.ui-slide-item>.gallery-frame>.gallery-detail>.gallery-bd>p'
    );
    const num2 = Math.min(...[itemA.length, itemB.length]);
    for (let i = 0; i < num2; i++) {
      let _content = itemBB[i].children[0].data;
      _content = _content.replace(/\s|\n/g, '');
      hotNews[i] = {
        title: itemB[i].attribs.alt,
        img_src: itemB[i].attribs.src,
        link: itemA[i].attribs.href,
        content: _content
      };
    }
    const itemC = $('#reviews > .reviews-bd > .review > .review-hd > a');
    const itemD = $('#reviews > .reviews-bd > .review > .review-hd > a > img');
    const itemE = $('#reviews > .reviews-bd > .review > .review-bd > h3 > a');
    const itemF = $(
      '#reviews > .reviews-bd > .review > .review-bd > .review-meta'
    );
    const itemG = $(
      '#reviews > .reviews-bd > .review > .review-bd > .review-content'
    );
    const num3 = Math.min(
      ...[itemC.length, itemD.length, itemE.length, itemF.length, itemG.length]
    );
    for (let i = 0; i < num3; i++) {
      var Atags = itemF[i].children.filter(
        (fil) => fil.type === 'tag' && fil.name === 'a'
      );
      let _content = itemG[i].children[0].data;
      _content = _content.replace(/\n|\s/g, '');
      hotcomment[i] = {
        img_src: itemD[i].attribs['data-original'],
        img_link: itemC[i].attribs.href,
        title: itemE[i].children[0].data,
        title_link: itemE[i].attribs.href,
        user: Atags.length > 0 ? Atags[0].children[0].data : '',
        movieName: Atags.length > 1 ? Atags[1].children[0].data : '',
        content: _content
      };
    }
    return Promise.resolve({ isScreen, hotNews, hotcomment });
  } catch (err) {
    return Promise.reject({
      url: url,
      title: '豆瓣电影-解析错误',
      msg: err,
      date: new Date()
    });
  }
};

module.exports = doubanMovie;
