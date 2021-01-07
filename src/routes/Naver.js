import React, { useEffect, useState } from "react";
import NaverDayInfo from "components/NaverDayInfo";
import Loading from "components/Loading";
const Naver = () => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  let URL = `/webtoon/weekday.nhn`;
  const [dataInit, setDataInit] = useState(false);
  let [webtoons, setWebtoons] = useState({
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
    let id = 0;
    $("div.daily_all div.col div.col_inner ul li").each((i, element) => {
      const title = $(element).find("div.thumb a img").attr("title");
      const img = $(element).find("div.thumb a img").attr("src");
      let link = $(element).find("a.title").attr("href");
      link = `https://comic.naver.com${link}`;
      const day = link.slice(-3);
      id = id + 1;
      const webtoon = {
        id: id,
        title: title,
        img: img,
        link: link,
        day: day,
      };
      webtoons[day] = [...webtoons[day], webtoon];
    });
    setDataInit(true);
  };
  return (
    <div id="naver-mainscreen">
      <h2 className="webtoon_site__title">Naver Webtoon</h2>
      <div className="list_area daily_all">
        {dataInit ? (
          webtoonsKeys.map((day) => (
            <NaverDayInfo webtoonList={webtoons[day]} key={day} day={day} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
export default Naver;
