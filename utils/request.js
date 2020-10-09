const Request = require('request');
const request = (url) => {
  return new Promise((resolve, reject) => {
    Request(
      {
        url,
        encoding: null
      },
      (error, response, body) => {
        if (error) {
          return reject(error);
        }
        return resolve(response.body);
      }
    );
  }).catch((error) => {
    return reject(error);
  });
};
module.exports = request;
