import React, { useEffect, useState } from "react";
import NaverDayInfo from "components/NaverDayInfo";
const Naver = () => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  let URL = `/webtoon/weekday.nhn`;
  const [dataInit, setDataInit] = useState(false);
  const [webtoons, setWebtoons] = useState({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  });
  const webtoonsKeys = Object.keys(webtoons);
  useEffect(() => {
    if (dataInit === false) {
      getHtml();
    }
  }, []);
  const getHtml = async () => {
    const html = await axios.get(URL);
    const $ = await cheerio.load(html.data);
    $("div.daily_all div.col div.col_inner ul li").each((i, element) => {
      const title = $(element).find("div.thumb a img").attr("title");
      const img = $(element).find("div.thumb a img").attr("src");
      let link = $(element).find("a.title").attr("href");
      link = `https://comic.naver.com${link}`;
      const day = link.slice(-3);
      const webtoon = {
        title: title,
        img: img,
        link: link,
        day: day,
      };
      webtoons[day] = [...webtoons[day], webtoon];
    });
    console.log(webtoons); //showing data
    setDataInit(true);
  };
  return (
    <div>
      <h2>Naver Webtoon</h2>
      <div>
        { dataInit ? (
          webtoonsKeys.map((day) => (
          <NaverDayInfo webtoonList={webtoons[day]} key = {day} day = {day}/>
        ))) : ("Data Loading...")}
      </div>
    </div>
  );
};
export default Naver;
