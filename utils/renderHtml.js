const renderHtml = (data) => {
  let div = '';
  data.map((str) => str && (div += str));
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        .card{
          padding: 5px;
          border-radius: 4px;
          border: 1px solid #ebeef5;
          background-color: #fff;
          overflow: hidden;
          color: #303133;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          transition: .3s;
        }
      </style>
    </head>
    <body>
      ${div}
    </body>
  </html>
  `;
};
module.exports = renderHtml;
