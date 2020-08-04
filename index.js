const {
  zhihuDaily,
  weiboTop,
  doubanMovie,
  mojiWeather,
  one,
} = require("./api/index");
(async function () {
  const test = await zhihuDaily().catch((err) => console.error(err));;
  const test2 = await weiboTop().catch((err) => console.error(err));;
  const test3 = await doubanMovie().catch((err) => console.error(err));;
  const test4 = await mojiWeather().catch((err) => console.error(err));
  const test5 = await one();
  debugger
})();
