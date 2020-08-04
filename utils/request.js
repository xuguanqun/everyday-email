const Request = require("request");
const request = (url) => {
  return new Promise((resolve, reject) => {
      Request(
        {
          url,
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
          "Accept-Language": "zh-CN",
          encoding: null,
        },
        (error, response, body) => {
          if (error) {
            return reject(error);
          }
          return resolve(response.body);
        }
      );
  }).catch(err=>{
    //
  })
};
module.exports = request;
