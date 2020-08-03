const {
  zhihuDaily,
  weiboTop,
  doubanMovie,
  mojiWeather,
} = require("./api/index");
(async function () {
  // const test = await zhihuDaily();
  // const test2 = await weiboTop();
  // const test3 = await doubanMovie();
  const test4 = await mojiWeather();
  // const test5 = await doubanMovie();
  console.log("result::\n\n\n", test4);
})();
