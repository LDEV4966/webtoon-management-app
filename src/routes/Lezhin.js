import React, { useCallback, useEffect, useState } from "react";
import WebtoonsDayInfo from "components/WebtoonsDayInfo";
import Loading from "components/Loading";
const Lezhin = ({ userObj }) => {
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
    const html = await axios.get(`/ko/scheduled?`);
    const $ = await cheerio.load(html.data);
    $("ul.lzComic__list").each((i, element) => {
      if (i >= 1 && i < 8) {
        console.log($(element));
      }
    });

    setDataInit(false);
  }, [axios, cheerio]);
  useEffect(() => {
    if (dataInit === false) {
      getHtml();
    }
    return () => {};
  }, [dataInit, getHtml]);
  return (
    <div id="daum-mainscreen">
      <h2 className="webtoon_site__title">Lezhin comics</h2>
      <div className="list_area daily_all">
        {dataInit ? (
          webtoonsKeys.map((day) => (
            <WebtoonsDayInfo
              webtoonList={webtoons[day]}
              key={day}
              day={day}
              userObj={userObj}
              siteName="lezhin"
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
export default Lezhin;
