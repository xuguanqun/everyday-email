//this is node.js code
const HTTPS = require('https');
const Request = require('request');
const nodemailer = require('nodemailer');//email
const cheerio = require('cheerio');//jq for server
const iconv = require('iconv-lite');//decode gb2312
const schedule = require('node-schedule');
// email info
const Email = {
    subject:'',// 邮件主题
    from:'',// 你的邮箱
    pass:'', // qq smtp授权码
    to:'',// 接收人邮箱
    error:''//代码出现错误的时候，将错误信息发送至该邮箱
}
//全局data
global.data={
    count:0,//检测爬取次数 1秒一次
    wheather:{},//墨迹天气
    weiboTop:[],//微博热搜
    doubanMovie:[],//豆瓣电影 正在热映
    doubanMovie2:[],//豆瓣电影 即将上映
    one:{title:'',img:''},//ONE
    zhihuDaily:[],//知乎日报
    //记录天数
    passDay:[
        {name:'❤️',date:'xxxx-mm-dd',color:'#ff4d4f'},
    ],
    //日期 纪念日
    remenber:[
        //name:事项 date:日期 before:提前几天提醒 desc:详细描述
        {name:'你的生日🎂',date:'mm-dd',before:3,desc:'又要长大一岁了哦！',color:'#ffa940'},
        {name:'他的生日🎂',date:'mm-dd',before:7,desc:'给他准备一份惊喜哦！',color:'#ffa940'},
    ]
};
//执行函数
(function(){
// 8:15 everyday
var interval = schedule.scheduleJob('00 15 08 * * *',()=>{
    start();
})
})();

function start(){
    console.log('执行',new Date());
    doPassDay();
    doRemenber();
    weiboTop();
    wheather();
    doubanMovie();
    doubanMovie2();
    one();
    zhihuDaily();
    global.checkTimer = setInterval(() => {
        global.data.count++;
        console.log('获取数据：等待秒数',global.data.count);
        if( (global.data.wheather['温度'] && 
            global.data.weiboTop.length>0&&
            global.data.doubanMovie.length>0&&
            global.data.doubanMovie2.length>0&&
            global.data.one.title) || global.data.count > 60
            ){
            clearInterval(global.checkTimer);
            global.data.count=0;
            // console.log(JSON.stringify(global.data));
            renderHtml((html)=>{
                sendEmail(Email.to,html);
            },(error)=>{//发送错误邮件
                sendEmail(Email.error,`<p>${JSON.stringify(error)}</p>`);
            });
        }
    }, 1000);
}
function doPassDay(){
    if(global.data.passDay.length===0){
        global.data.passDay_HTML = '';
        return
    };
    var span = '';
    global.data.passDay.map(v=>{
        let startTime = new Date(v.date);
        let nowTime = new Date();
        let oneday = 60*60*24;
        let day = ((nowTime - startTime)/oneday)/1000;
        span += `<span>${v.name} <b style="color:${v.color}">${parseInt(day)}</b> 天</span>`;
    })
    global.data.passDay_HTML = `<div style="display:flex;justify-content:space-around;">${span}</div>`;
}
function doRemenber(){
    if(global.data.remenber.length===0){
        global.data.remenber_HTML = '';
        return
    };
    var t = new Date();
    var y = t.getFullYear();
    var div = '';
    global.data.remenber.map(v=>{
        var _arr = v.date.split('-');
        if(_arr.length===3 && _arr[0] == new Date().getFullYear()){// 提醒一次
            var tc = new Date(v.date) - t;
            var day = Math.ceil(tc / (60*60*24) / 1000);
            if(day<=v.before){
                div += `<div style="margin:5px 0;text-align:left">距离 <b style="color:${v.color || '#212121'}">${v.name}</b> 还有 <b style="display:inline-block;color: white;background: #0084ff;width: 24px;height: 24px;text-align: center;border-radius: 50%;">${day}</b> 天<br />${v.desc || ''}</div>`
            }
        }else if(_arr.length===2){ // 每月提醒
            var tc = new Date(y + '-' + v.date) - t;
            var day = Math.ceil(tc / (60*60*24) / 1000);
            if(day<=v.before){
                div += `<div style="margin:5px 0;text-align:left">距离 <b style="color:${v.color || '#212121'}">${v.name}</b> 还有 <b style="display:inline-block;color: white;background: #0084ff;width: 24px;height: 24px;text-align: center;border-radius: 50%;">${day}</b> 天<br />${v.desc || ''}</div>`
            }
        }
    })
    global.data.remenber_HTML = `<div style="display:flex;flex-direction:column;">${div}</div>`;
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
        if(!wheather_type){
            setTimeout(() => {
                wheather();
            }, 1000);
            return
        }
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
            var o = {0:'#f5222d',1:'#fa541c',2:'#fa8c16'}
            global.data.weiboTop.push({
                title:tag_a[i].children[0].data,
                title_link:'https://s.weibo.com'+tag_a[i].attribs.href,
                color:o[i] || '#8c8c8c'
            })
        }
    })
}
function doubanMovie(){
    HTTPS.get('https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0', (req, res) => {
        var chunk = '';
        req.on('data', function (data) {
            chunk += data;
        });
        req.on('end', function () {
            var json = JSON.parse(chunk);
            var arr = json.subjects.map(v=>{
                return {
                    title:v.title,
                    img_src:v.cover,
                    title_link:v.url,
                    rate:v.rate
                }
            })
            arr.sort((a,b)=>Number(b.rate) - Number(a.rate));
            
            global.data.doubanMovie = arr.slice(0,10);
        });
        req.on('error', function (err) {
            // error&&error(err);
        });
    })
}
function doubanMovie2(){
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
        let item_time = $('.ui-slide-item>ul>.release-date');
        let len = [item.length,item_a.length,item_time.length];
        let max = Math.max(...len)
        let num = max<10?max:10;
        
        for(let i=0;i<num;i++){
            global.data.doubanMovie2.push({
                title:item[i].attribs.alt,
                img_src:item[i].attribs.src,
                title_link:item_a[i].attribs.href,
                time:item_time[i].firstChild.data
            })
        }
        var res = global.data.doubanMovie2.map(v=>{
            var o = v;
            if(!v.time)return '';
            var y = new Date().getFullYear();
            var m = v.time.indexOf('月');
            var d = v.time.indexOf('日');
            var mm = v.time.substring(m-2,m);
            var dd = v.time.substring(d-2,d);
            o.time2 = `${y}-${mm}-${dd}`;
            return o;
        })
        res.sort((a,b)=>new Date(a.time2) - new Date(b.time2));
        global.data.doubanMovie2 = res;
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
                title_link:'http://daily.zhihu.com'+daily_href[i].attribs.href,
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
            global.data.weiboTop.map((v1,index)=>weibo+=`<div style="display: flex;justify-content: start;margin:7px 0;width:300px">
            <b style="display:block;color: white;background: ${v1.color};width: 24px;height: 24px;text-align: center;border-radius: 50%;">${index+1}</b>&ensp;
            <a style="color:#262626;text-decoration:none;font-size:16px;width:260px" href="${v1.title_link}">${v1.title}</a>
        </div>`);
        }
        //豆瓣电影 正在热映
        let movie = '';
        if(global.data.doubanMovie.length>0){
            global.data.doubanMovie.map(v2=>movie+=`<div style="height:60px;padding:5px;display:flex;justify-content:start;">
            <img style="height:100%;border-radius:5px;" src="${v2.img_src}" />&ensp;
            <a style="color:black;text-decoration:none;font-size:13px"href="${v2.title_link}">
            ${v2.title}<br /><span style="font-size:13px;color:${v2.rate<4?'#d81e06':'#e09015'}">${v2.rate}</span>
            </a>
            </div>`);
        }
        //豆瓣电影 即将上映
        let movie2 = '';
        if(global.data.doubanMovie2.length>0){
            global.data.doubanMovie2.map(v2=>movie2+=`<div style="height:60px;padding:5px;display:flex;justify-content:flex-end;">
            <a style="color:black;text-decoration:none;font-size:13px"href="${v2.title_link}">
            ${v2.title}<br /><span style="color:grey;font-size:12px">${v2.time}</span>
            </a>&ensp;
            <img style="height:100%;border-radius:5px;" src="${v2.img_src}" />
            </div>`);
        }
        //知乎日报
        let zhihu = '';
        if(global.data.zhihuDaily.length>0){
            global.data.zhihuDaily.map((v3,index)=>zhihu+=`<div style="display: flex;justify-content: start;margin:7px 0;width:300px">
            <b style="display:block;color: white;background: #0084ff;width: 24px;height: 24px;text-align: center;border-radius: 50%;">${index+1}</b>&ensp;
            <a style="color:#262626;text-decoration:none;font-size:16px;width:260px" href="${v3.title_link}">${v3.title}</a>
        </div>`);
            }
        //HTML 完整组合
        var html=`${global.data.passDay_HTML?global.data.passDay_HTML:''}<br />

        ${global.data.remenber_HTML? `<div style="width:100%;text-align:center">
        <div><em style="margin:3px 0;color:#424242">—————— 提醒 ——————</em></div><br />
        ${global.data.remenber_HTML}
        </div>
        <br />` :''}
        
        ${wheather}
        <br />
        <div style="width:100%;text-align:center">
        <div><em style="color:#424242">—————— ONE ——————</em></div><br />
        <img style="display:block;margin:0 auto;width:80%;border-radius:5px;" src="${global.data.one.img_src}" />
        <div style="margin-top:6px;font-size:15px"><em>${global.data.one.title}</em></div>
        </div>
        <br />
        ${global.data.zhihuDaily.length>0?`
        <div style="width:100%;text-align:center"><em style="color:#424242">—————— 知乎日报 ——————</em></div>
        <div style="padding:10px 20px;display:flex;flex-direction:column;">
        ${zhihu}
        </div>
        `:''}
        <br />
        ${global.data.weiboTop.length>0?`<div style="width:100%;text-align:center"><em style="color:#424242">—————— 微博热搜 ——————</em></div>`:''}
        ${global.data.weiboTop.length>0?`
        <div style="padding:10px 20px;display:flex;flex-direction:column">
        ${weibo}
        </div>
        `:''}
        ${global.data.doubanMovie.length>0&&global.data.doubanMovie2.length>0?`<div style="width:100%;text-align:center"><em style="color:#424242">—————— 豆瓣电影 ——————</em></div>`:''}
        ${global.data.doubanMovie.length>0?`
        <div style="width:50%;float:left">
        <h3>院线热映</h3>
        ${movie}
        </div>
        `:''}
        ${global.data.doubanMovie2.length>0?`
        <div style="width:50%;float:left">
        <h3 style="text-align:right">即将上映</h3>
        ${movie2}
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
            user:Email.from,
            pass:Email.pass,//qq smtp授权码
        }
    });
    let mailOptions = {
        // from: 'imlostdeer@gmail.com', // sender address
        from:Email.from,
        to:emailAddress,
        subject:Email.subject, // Subject line
        // text: '发送text版本', // plain text body
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
                doubanMovie2:[],
                one:{title:'',img:''},//ONE
                zhihuDaily:[],//知乎日报
            }
            //end
            // console.log('清除之后',JSON.stringify(global.data));
        }
    });
}
