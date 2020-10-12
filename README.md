# everyday-email

## 主要功能

通过爬取：天气、微博、知乎、ONE、豆瓣电影、豆瓣读书，将数据整合成邮件，定时发送。

## 示例

<div>
 <img src="https://github.com/xuguanqun/everyday-email/blob/master/images/p1.png?raw=true" width="187px" height="406px" />&emsp;
 <img src="https://github.com/xuguanqun/everyday-email/blob/master/images/p2.png?raw=true" width="187px" height="406px" />&emsp;
 <img src="https://github.com/xuguanqun/everyday-email/blob/master/images/p3.png?raw=true" width="187px" height="406px" />&emsp;
</div>
 
## 开始
```node
npm install
node index.js
```
## 使用pm2
```
pm2 start index.js --name everyday-email
```
## 配置
> 所有配置项均在 `config.json` 文件进行配置
### 1.配置邮箱信息
``` json
{
  "mailOption": {
    "auth": {
      "user": "1234567@qq.com",
      "pass": "abcdefg"
    }
  },
  "sendEmail": {
    "address": "7654321@qq.com",
    "subject": "" 
  },
  "errorEmail": {
    "address": "1122334455@qq.com"
  },
}
```
**user** 填写的是你的qq邮箱  
**pass** 填写的是qq邮箱的授权码，不是qq密码。（登陆网页qq邮箱，进入设置-账户-生成授权码，跟着步骤，发送短信获取）  
**subject** 邮件的标题，默认为ONE的每日一句  
**sendEmail.address** 发送目的地邮箱  
**errorEmail.address** 程序错误时，接收错误信息邮箱

默认只支持配置 qq 邮箱，如需配置其他邮箱，参考 [nodemailer](https://github.com/nodemailer/nodemailer 'nodemailer') 文档，自行配置

### 2.修改地址（获取天气时使用）

```json
{
  "address": "china/zhejiang/wenzhou"
}
```

默认为杭州  
你可访问 https://tianqi.moji.com/weather/china/zhejiang/wenzhou 查看效果  
进入 https://tianqi.moji.com/weather 选择你所在的城市，取`url`中`weather`之后的字符串即可

### 3.纪念日或是事项提醒（可选）

```json
{
  "commemoration": [
    {
      "name": "你的生日",
      "date": "10-26",
      "advance": 15
    }
  ]
}
```

`date` 无需填写年份，`advance` 为提前多少天提醒

### 4.修改执行时间

默认是在每天的 8 点 00 分 执行

```json
{
  "interval": "00 20 08 * * *"
}
```

例：修改为 8 点 20 分

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

具体请根据 [node-schedule](https://github.com/node-schedule/node-schedule 'node-schedule') 文档自行修改

### 5.配置卡片

```json
{
  "dataCard": ["微博热搜", "天气", ...]
}
```

数据将会根据 `dataCard` 配置有序进行渲染，可自行配置内容以及顺序

## 关于

项目代码非常简单，供学习娱乐使用。

### 项目所使用到的包

- [request](https://github.com/request/request 'request')
- [cheerio](https://github.com/cheeriojs/cheerio 'cheerio')
- [iconv-lite](https://github.com/ashtuchkin/iconv-lite 'iconv-lite')
- [node-schedule](https://github.com/node-schedule/node-schedule 'node-schedule')
- [nodemailer](https://github.com/nodemailer/nodemailer 'nodemailer')
