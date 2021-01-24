const { createProxyMiddleware } = require("http-proxy-middleware");
//LOCAL 에서 실행시 CORS문제 해결을 위해 작성
module.exports = (app) => {
  app.use(
    createProxyMiddleware("/webtoon", {
      target: "https://comic.naver.com",
      changeOrigin: true,
    })
  );
};
