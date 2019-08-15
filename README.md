# everyday-email
给你的女朋友每天发一封爱的邮件
## 主要功能
通过爬取：天气、微博、知乎、ONE、豆瓣电影，将数据整合成邮件，定时发送。
## 示例

<div>
<img src="https://github.com/xuguanqun/everyday-email/blob/master/iamges/1.jpg" width="150px" height="189.2px" />&emsp;
<img src="https://github.com/xuguanqun/everyday-email/blob/master/iamges/2.jpg" width="150px" height="220px" />&emsp;
<img src="https://github.com/xuguanqun/everyday-email/blob/master/iamges/3.jpg" width="150px" height="220px" />
</div>
 
## 开始
```
npm install
```
## 运行
```
node email_to_girlfriend.js
```
代码默认为服务器部署时定时执行，如要在本地立即测试，请注释schedule定时函数（注释第24行和第53行）
## 使用pm2
```
pm2 email_to_girlfriend.js
```
## 关于
### 项目所使用到的包
* [request](https://github.com/request/request "request")
* [cheerio](https://github.com/cheeriojs/cheerio "cheerio")
* [iconv-lite](https://github.com/ashtuchkin/iconv-lite "iconv-lite")
* [node-schedule](https://github.com/node-schedule/node-schedule "node-schedule")
* [nodemailer](https://github.com/nodemailer/nodemailer "nodemailer")
