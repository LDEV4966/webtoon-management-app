const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/weekday.nhn", {
      target: "https://comic.naver.com/webtoon",
      changeOrigin: true,
    })
  ),
    app.use(
      createProxyMiddleware("/list.nhn", {
        target: "https://comic.naver.com/webtoon",
        changeOrigin: true,
      })
    )
};
