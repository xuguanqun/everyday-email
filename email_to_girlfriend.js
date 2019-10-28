//this is node.js code
const Request = require('request');
const nodemailer = require('nodemailer');//email
const cheerio = require('cheerio');//jq for server
const iconv = require('iconv-lite');//decode gb2312
const schedule = require('node-schedule');//

//全局data
global.data={
    count:0,//时间计数
    wheather:{},//天气预报
    weiboTop:[],//微博热搜
    doubanMovie:[],//豆瓣电影
    one:{title:'',img:''},//ONE
    zhihuDaily:[],//知乎日报
    //日期 纪念日 获取倒数时间 天数
    remenber:{
        date:null,
        love:null,
        birthday:null,
    }
}
// 7:50 每天七点五十执行
var interval = schedule.scheduleJob('00 50 07 * * *',()=>{
    console.log('执行');
    global.data.remenber.date = getDate();//今天
    global.data.remenber.love = getPassDay(new Date('2015-11-30'),new Date());//示例 纪念日
    global.data.remenber.birthday = birthday('10-16');//填入生日 MM-DD
    wheather();//获取天气
    one();//获取ONE
    zhihuDaily();//获取知乎日报
    weiboTop();//获取微博热搜
    doubanMovie();//获取豆瓣电影
    global.checkTimer = setInterval(() => {
        global.data.count++;
        if( (global.data.wheather['温度'] && 
            global.data.weiboTop.length>0&&
            global.data.doubanMovie.length>0&&
            global.data.one.title) || global.data.count>60
            ){
            clearInterval(global.checkTimer);
            global.data.count=0;
            // console.log(JSON.stringify(global.data));
            renderHtml((html)=>{
                //渲染完成后 发送邮件
                sendEmail('6666666666@qq.com',html);//这里填女朋友的邮箱哦！
            },(error)=>{
                //当遇到错误时 将错误信息发送到你自己的邮箱 
                sendEmail('1234567890@qq.com',`<p>${JSON.stringify(error)}</p>`);
            });
        }
    }, 1000);
})
function birthday(date){
    let _date = '';
    let nowYear = new Date().getFullYear();
    let nowMonth = new Date().getMonth()+1;
    if(nowMonth>10){
        _date = `${nowYear+1}-${date}`;
    }else{
        _date = `${nowYear}-${date}`;
    }
    return getPassDay(new Date(),new Date(_date));
}
function getPassDay(startTime,nowTime){
    //计算时间间隔
    // nowTime - startTime
    let oneday = 60*60*24;
    let day = ((nowTime - startTime)/oneday)/1000;
    return parseInt(day);
}
function getDate(){
    let time = new Date();
    let week = ['日','一','二','三','四','五','六'];
    return `${time.getFullYear()}年${time.getMonth()+1}月${time.getDate()}日 星期${week[time.getDay()]}`;
}
//根据天气情况显示背景图
function getBackground(f_str_weather){
    let background = 'https://h5tq.moji.com/tianqi/assets/images/skin/day_0.jpg';//默认 晴
    let _obj = [
        {weather:'晴',img:'https://h5tq.moji.com/tianqi/assets/images/skin/day_0.jpg'},
        {weather:'阴',img:'https://h5tq.moji.com/tianqi/assets/images/skin/day_1.jpg'},
        {weather:'雨',img:'https://h5tq.moji.com/tianqi/assets/images/skin/day_3.jpg'},
        {weather:'雷',img:'https://h5tq.moji.com/tianqi/assets/images/skin/day_4.jpg'},
        {weather:'雪',img:'https://h5tq.moji.com/tianqi/assets/images/skin/day_13.jpg'},
        {weather:'雾',img:'https://h5tq.moji.com/tianqi/assets/images/skin/day_18.jpg'},
        {weather:'沙',img:'https://h5tq.moji.com/tianqi/assets/images/skin/day_20.jpg'},
        {weather:'霾',img:'https://h5tq.moji.com/tianqi/assets/images/skin/day_45.jpg'},
    ]
    _obj.map(v=>{
        if(f_str_weather.indexOf(v.weather) !== -1){//符合
            background = v.img;
        }
    });
    return background;
}
function wheather(){
    Request({
        url:'https://tianqi.moji.com/weather/china/zhejiang/xihu-district',
        encoding:null},
        (error, response, body)=>{
        // console.log(error, response, body);
        if(error){
            console.error('获取天气失败',error);
            return;
        }
        const html = iconv.decode(body,'utf8');
        const $ = cheerio.load(html);
        // let text = $('meta')[2].attribs.content;
        // global.data.wheather = text.replace(/墨迹天气/g,'');
        let kongqi = $('.wea_alert>ul>li>a>span>img')[0]?$('.wea_alert>ul>li>a>span>img')[0].attribs:false;
        let warning = $('.warning_aqi>a>span>img')[0]?$('.warning_aqi>a>span>img')[0].attribs:false;
        let wendu = $('.wea_weather>em')[0]?$('.wea_weather>em')[0].children[0].data:false;
        let wheather_type = $('.wea_weather>span>img')[0]?$('.wea_weather>span>img')[0].attribs.alt:false;
        let wheather_img = $('.wea_weather>span>img')[0]?$('.wea_weather>span>img')[0].attribs.src:false;
        let shidu = $('.wea_about>span')[0]?$('.wea_about>span')[0].children[0].data:false;
        let fengxiang = $('.wea_about>em')[0]?$('.wea_about>em')[0].children[0].data:false;
        let tips = $('.wea_tips>em')[0]?$('.wea_tips>em')[0].children[0].data:false;
        global.data.wheather ={
            '背景':getBackground(wheather_type),
            '温度':wendu,
            '天气':wheather_type,
            '图标':wheather_img,
            '空气':kongqi,
            '预警':warning,
            '湿度':shidu&&shidu.replace(/湿度/g,''),
            '风向':fengxiang,
            '提示':tips
        }
    })
}
function weiboTop(){
    Request({
        url:'https://s.weibo.com/top/summary',
        encoding:null
    },
    (error, response, body)=>{
        if(error){
            console.error('获取热搜失败',error);
            return;
        }
        const html = iconv.decode(body,'utf8');
        const $ = cheerio.load(html);
        let tag_a = $('td>a');
        for(let i=0;i<10;i++){
            global.data.weiboTop.push({
                title:tag_a[i].children[0].data,
                title_link:'https://s.weibo.com'+tag_a[i].attribs.href
            })
        }
    })
}
function doubanMovie(){
    Request({
        url:'https://movie.douban.com/',
        encoding:null
    },
    (error, response, body)=>{
        if(error){
            console.error('获取豆瓣失败',error);
            return;
        }
        const html = iconv.decode(body,'utf8');
        const $ = cheerio.load(html);
        let item = $('.ui-slide-item>ul>.poster>a>img');
        let item_a = $('.ui-slide-item>ul>.poster>a');
        for(let i=0;i<10;i++){
            global.data.doubanMovie.push({
                title:item[i].attribs.alt,
                img_src:item[i].attribs.src,
                title_link:item_a[i].attribs.href
            })
        }
    })
}
function one(){
    Request({
        url:'http://wufazhuce.com/',
        encoding:null
    },
    (error, response, body)=>{
        if(error){
            console.error('获取one失败',error);
            return;
        }
        const html = iconv.decode(body,'utf8');
        const $ = cheerio.load(html);
        let img_src = $('.fp-one-imagen')[0].attribs.src;
        let title = $('.fp-one-cita>a')[0].children[0].data;
        global.data.one={img_src,title}
    })
}
function zhihuDaily(){
    Request({
        url:'http://daily.zhihu.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
        'Accept-Language': 'zh-CN',
        encoding:null
    },
    (error, response, body)=>{
        if(error){
            console.error('获取数据失败',error);
            return;
        }
        const html = iconv.decode(body,'utf8');
        const $ = cheerio.load(html);
        let daily_href = $('.main-content-wrap>.row>div>.wrap>.box>a');
        let daily_title = $('.main-content-wrap>.row>div>.wrap>.box>a>span');
        let daily_img = $('.main-content-wrap>.row>div>.wrap>.box>a>img');
        for(let i=0;i<5;i++){
            global.data.zhihuDaily.push({
                title:daily_title[i].children[0].data,
                img_src:daily_img[i].attribs.src,
                title_link:'http://daily.zhihu.com'+daily_href[i].attribs.href
            })
        }
    })
}
function renderHtml(onOk,onErr){
    // console.log(JSON.stringify(global.data.wheather))
    // global.data.wheather;debugger
    try{
        //渲染天气modal
        let tq = global.data.wheather;
        let wheather = `<div style="padding:5px;height:180px;text-align:center;color:white;border-radius:5px;background:url(${tq['背景']});background-size:100% 100%;">
        <div style="width:50%;height:85%;float:left;text-align:left;display:flex;flex-direction:column;justify-content: space-around;">
        ${ tq['预警'] ? `<span>天气预警 &ensp;${tq['预警'].alt}</span>` : '' }
        ${ tq['空气'] ? `<span>空气质量 &ensp;${tq['空气'].alt}</span>` : '' }
        ${ tq['湿度'] ? `<span>湿度 &emsp;${tq['湿度']}</span>` : '' }
        ${ tq['风向'] ? `<span>风向 &emsp;${tq['风向']}</span>` : '' }
        </div>
        <div style="width:50%;height:85%;float:right">
        <div style="width:100%;font-size:50px;">${tq['温度']}℃</div>
        <span style="font-size:20px;"><img style="height:60px;width:60px;" src="${tq['图标']}" />&ensp;${tq['天气']}</span>
        </div>
        <p>${tq['提示']}</p>
        </div>
        `;
        //微博热搜
        let weibo = '';
        if(global.data.weiboTop.length>0){
            global.data.weiboTop.map((v1,index)=>weibo+=`<a style="margin:7px;padding:8px 5px;color:black;text-decoration:none"href="${v1.title_link}"><b>${index+1}</b> ${v1.title}</a>`);
        }
        //豆瓣电影
        let movie = '';
        if(global.data.doubanMovie.length>0){
            global.data.doubanMovie.sort((a,b)=>b.star-a.star).map(v2=>movie+=`<div style="height:60px;padding:5px;display:flex;justify-content:start;">
            <img style="height:100%;border-radius:5px;" src="${v2.img_src}" />&ensp;
            <a style="color:black;text-decoration:none"href="${v2.title_link}">
            ${v2.title} <span style="color:${v2.star<4?'#d81e06':'#e09015'}">${v2.star}</span>
            </a>
            </div>`);
        }
        //知乎日报
        let zhihu = '';
        if(global.data.zhihuDaily.length>0){
        global.data.zhihuDaily.map(v3=>zhihu+=`<a style="margin:7px;padding:8px 5px;color:black;text-decoration:none"href="${v3.title_link}">${v3.title}</a>`);
        }
        //HTML
        var html=`<p>${global.data.remenber.date}<span style="float:right">❤️ ${global.data.remenber.love} 天</span></p>
        ${global.data.remenber.birthday<=7&&global.data.remenber.birthday>0?`<h2>距离你的生日还有 ${global.data.remenber.birthday} 天</h2>`:''}
        <br />
        ${wheather}
        <br />
        <div style="width:100%;text-align:center">
        <div><em style="color:#424242">—————— ONE ——————</em></div>
        <img style="width:80%;border-radius:5px;" src="${global.data.one.img_src}" />
        <div><em>${global.data.one.title}</em></div>
        </div>
        <br />
        ${global.data.zhihuDaily.length>0?`
        <div style="width:100%;text-align:center"><em style="color:#424242">—————— 知乎日报 ——————</em></div>
        <div style="display:flex;flex-direction:column;text-align:center;">
        ${zhihu}
        </div>
        `:''}
        <br />
        ${global.data.weiboTop.length>0&&global.data.doubanMovie.length>0?`<div style="width:100%;text-align:center"><em style="color:#424242">———— 微博热搜、豆瓣电影 ————</em></div>`:''}
        ${global.data.weiboTop.length>0&&global.data.doubanMovie.length===0?`<div style="width:100%;text-align:center"><em style="color:#424242">———— 微博热搜 ————</em></div>`:''}
        ${global.data.weiboTop.length===0&&global.data.doubanMovie.length>0?`<div style="width:100%;text-align:center"><em style="color:#424242">———— 豆瓣电影 ————</em></div>`:''}
        ${global.data.weiboTop.length>0?`
        <div style="width:50%;float:left;display:flex;flex-direction:column">
        <h3>微博热搜</h3>
        ${weibo}
        </div>
        `:''}
        ${global.data.doubanMovie.length>0?`
        <div style="width:50%;float:left">
        <h3>院线热映</h3>
        ${movie}
        </div>
        `:''}
        `;
        onOk&&onOk(html);
    }catch(err){
        onErr&&onErr(err);
    }
}
function sendEmail(emailAddress,html){
    let transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        service:'qq',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user:'1234567890@qq.com',//这里填写你的qq邮箱
            pass:'hnlpystnsfoohdia',//示例 qq邮箱smtp授权码 ！非密码 授权码需进qq邮箱手动获取
        }
    });
    let mailOptions = {
        from:'1234567890@qq.com',//你的邮箱 与前面一致
        to:emailAddress,//对方邮箱
        subject: '💌一封爱的小邮件', // Subject line 邮件标题
        html: html
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.error('发送错误',error)
        }else{
            console.log('发送成功',info);
            //清空 data
            global.data={
                wheather:{},//天气预报
                weiboTop:[],//微博热搜
                doubanMovie:[],//豆瓣电影
                one:{title:'',img:''},//ONE
                zhihuDaily:[],//知乎日报
                //日期 纪念日
                remenber:{
                    date:null,
                    love:null,
                    birthday:null,
                }
            }
            //end
        }
    });
}
