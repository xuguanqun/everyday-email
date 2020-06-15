# everyday-email
## 主要功能
通过爬取：天气、微博、知乎、ONE、豆瓣电影，将数据整合成邮件，定时发送。
## 示例

<div>
 <img src="https://github.com/xuguanqun/everyday-email/blob/master/images/1.png?raw=true" width="150px" height="250px" />&emsp;
 <img src="https://github.com/xuguanqun/everyday-email/blob/master/iamges/2.png" width="150px" height="250px" />&emsp;
  <img src="https://github.com/xuguanqun/everyday-email/blob/master/iamges/3.png" width="150px" height="250px" />&emsp;
</div>
 
## 开始
```node
npm install
```
## 运行
```node
node email_to_girlfriend.js
```
代码默认为服务器部署时定时执行，如要在本地立即测试，请注释 `schedule` 定时函数（注释第39行和第41行）
## 使用pm2
```
pm2 email_to_girlfriend.js
```
## 详细使用方式
### 1.配置邮件
``` js
const Email = {
    subject:'',// 邮件主题
    from:'',// 你的邮箱
    pass:'', // qq smtp授权码
    to:'',// 接收人邮箱
    error:''//代码出现错误的时候，将错误信息发送至该邮箱
}
```
**subject** 邮件的标题，可使用emoji标签，比如：❤️  
**pass** 填写的是qq邮箱的授权码，不是qq密码。（登陆网页qq邮箱，进入设置-账户-生成授权码，跟着步骤，发送短信获取） 

默认只支持配置qq邮箱，如需配置其他邮箱，参考[nodemailer](https://github.com/nodemailer/nodemailer "nodemailer")文档，自行修改 `sendEmail` 函数（416行）
### 2.日期计数（可选）
```js
passDay:[
        {name:'❤️',date:'xxxx-mm-dd',color:'#ff4d4f'},
    ]
```
可填入多个日期计数  
+ name: 计数项的名称  
+ date: 需要按照格式填写，如：2020-2-27  
+ color: 计数项颜色（也就是恋爱两个字的颜色）  
### 3.纪念日或是事项提醒（可选）
```js
remenber:[
        {name:'你的生日🎂',date:'mm-dd',before:3,desc:'又要长大一岁了呢！',color:'#ffa940'},
    ]
```
+ name: 计数项的名称  
+ date: 可填写两种格式：2020-2-27 或 2-27，如果是带年份的，只有在那一天提醒一次，如果不带年份，每一年都会在这个日期提醒。（前提是你服务器买了好几年的情况下，哈哈哈） 
+ desc: 事件描述  
+ color: 事项颜色（也就是 你的生日 四个字的颜色） 
### 4.修改执行时间
默认是在每天的 8点15分 执行  
```js
// 修改  '00 15 08 * * *'
var interval = schedule.scheduleJob('00 15 08 * * *',()=>{
    start();
})
```
格式说明
```java
00   15   08   *    *    *
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```
具体请根据 [node-schedule](https://github.com/node-schedule/node-schedule "node-schedule") 文档自行修改
## 关于
项目代码非常简单，供学习娱乐使用。
### 项目所使用到的包
* [request](https://github.com/request/request "request")
* [cheerio](https://github.com/cheeriojs/cheerio "cheerio")
* [iconv-lite](https://github.com/ashtuchkin/iconv-lite "iconv-lite")
* [node-schedule](https://github.com/node-schedule/node-schedule "node-schedule")
* [nodemailer](https://github.com/nodemailer/nodemailer "nodemailer")
