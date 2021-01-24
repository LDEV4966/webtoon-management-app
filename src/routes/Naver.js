import React, { useCallback, useEffect, useState } from "react";
import WebtoonsDayInfo from "components/WebtoonsDayInfo";
import Loading from "components/Loading";
const Naver = ({ userObj }) => {
  const axios = require("axios");
  const cheerio = require("cheerio");
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
  const getHtml = useCallback(async () => {
    const html = await axios.get("/webtoon/weekday.nhn");
    const $ = await cheerio.load(html.data);
    $("div.daily_all div.col div.col_inner ul li").each((i, element) => {
      const title = $(element).find("div.thumb a img").attr("title");
      const img = $(element).find("div.thumb a img").attr("src");
      let link = $(element).find("a.title").attr("href");
      link = `https://comic.naver.com${link}`;
      const day = link.slice(-3);
      const getIndex1 = link.indexOf("=");
      const getIndex2 = link.indexOf("&");
      const titleId = link.substring(getIndex1 + 1, getIndex2);
      const webtoon = {
        titleId, // 작업필요
        title,
        img,
        link,
        day,
      };
      setWebtoons((prev) => {
        return {
          ...prev,
          [day]: [...prev[day], webtoon],
        };
      });
    });
    setDataInit(true);
  }, [axios, cheerio]);
  useEffect(() => {
    if (dataInit === false) {
      getHtml();
    }
    return () => {};
  }, [dataInit, getHtml]);
  return (
    <div id="naver-mainscreen">
      <h2 className="webtoon_site__title">Naver Webtoon</h2>
      <div className="list_area daily_all">
        {dataInit ? (
          webtoonsKeys.map((day) => (
            <WebtoonsDayInfo
              webtoonList={webtoons[day]}
              key={day}
              day={day}
              userObj={userObj}
              siteName="naver"
              favorite={true}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
export default Naver;
