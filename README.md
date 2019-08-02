# everyday-email
给你的女朋友每天发一封爱的邮件
## 主要功能
通过爬取：天气、微博、知乎、ONE、豆瓣电影，将数据整合成HTML，定时发送邮件。
## 示例

<div>
<img src="https://github.com/xuguanqun/everyday-email/blob/master/iamges/1.jpg" width="187.5px" height="333.5px" />
<img src="https://github.com/xuguanqun/everyday-email/blob/master/iamges/2.jpg" width="187.5px" height="333.5px" />
<img src="https://github.com/xuguanqun/everyday-email/blob/master/iamges/3.jpg" width="187.5px" height="333.5px" />
</div>
 
## 开始
```
node node.js
```
## 使用pm2
```
pm2 node.js
```
## 关于
### 项目所使用到的包
* [request](https://github.com/request/request "request")
* [cheerio](https://github.com/cheeriojs/cheerio "cheerio")
* [iconv-lite](https://github.com/ashtuchkin/iconv-lite "iconv-lite")
* [node-schedule](https://github.com/node-schedule/node-schedule "node-schedule")
* [nodemailer](https://github.com/nodemailer/nodemailer "nodemailer")
