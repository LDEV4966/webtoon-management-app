import React, { useEffect, useState } from "react";
const Naver = () => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  let URL = `/webtoon/weekday.nhn`;
  const [dataInit,setDataInit] = useState(true);
  useEffect(()=>{
      if(dataInit===true){
        getHtml();
        setDataInit(false);
      }
  })
  const getHtml = async () => {
    console.log("hi");
    const html = await axios.get(URL);
    const $ = await cheerio.load(html.data);
    $("div.daily_all div.col div.col_inner ul li").each((i,element)=>{
        const title = $(element).find("div.thumb a img").attr("title");
        const img = $(element).find("div.thumb a img").attr("src");
        let link = $(element).find("a.title").attr("href");
        link = `https://comic.naver.com${link}`;
        const day =  link.slice(-3);
        console.log(title);
        console.log(link);
        console.log(day);
        console.log(img);
    })
  };
  return <div>Naver</div>;
};
export default Naver;
