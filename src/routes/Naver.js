import React, { useEffect, useState } from "react";
const Naver = () => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  let URL = `/webtoon/weekday.nhn`;
  const [dataInit, setDataInit] = useState(true);
  const [webtoons, setWebtoons] = useState([]);
  let toons = [];
  useEffect(() => {
    let all = [];
    if (dataInit === true) {
      getHtml();
      setDataInit(false);
    }
  });
  const getHtml = async () => {
    const html = await axios.get(URL);
    const $ = await cheerio.load(html.data);
    $("div.daily_all div.col div.col_inner ul li").each((i, element) => {
      const title = $(element).find("div.thumb a img").attr("title");
      const img = $(element).find("div.thumb a img").attr("src");
      let link = $(element).find("a.title").attr("href");
      link = `https://comic.naver.com${link}`;
      const day = link.slice(-3);
      let webtoon = {
        title: title,
        img: img,
        link: link,
        day: day,
      };
      toons = [...toons, webtoon];
    });
    console.log(toons);
  };
  return <div>Naver</div>;
};
export default Naver;
