import { dbService } from "fbase";
import React, { useCallback, useEffect, useState } from "react";
const Badge = ({ favorite, siteName, userObj, titleId }) => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  let URL = `/webtoon/list.nhn?titleId=${titleId}`;
  const [updateDay, setUpdataDay] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const addToFirebase = async (event) => {
    const {
      target: {
        parentElement: { parentElement },
      },
    } = event;
    const thumbLink = parentElement.firstChild;
    const thumbImg = thumbLink.firstChild;
    const index = thumbImg.alt.indexOf("/");
    const id = thumbImg.alt.substring(0, index);
    const day = thumbImg.alt.substring(index + 1);
    const targetWebtoonObj = {
      link: thumbLink.href,
      img: thumbImg.src,
      title: thumbImg.title,
      titleId: id,
      day: day,
    };
    await dbService
      .collection(userObj.uid)
      .doc(siteName)
      .collection(targetWebtoonObj.day)
      .doc(targetWebtoonObj.title)
      .set(targetWebtoonObj);
  };
  const delteToFirebase = async (event) => {
    const {
      target: {
        parentElement: { parentElement },
      },
    } = event;
    const thumbLink = parentElement.firstChild;
    const thumbImg = thumbLink.firstChild;
    const index = thumbImg.alt.indexOf("/");
    const day = thumbImg.alt.substring(index + 1);
    const targetWebtoonObj = {
      link: thumbLink.href,
      img: thumbImg.src,
      title: thumbImg.title,
      day: day,
    };
    const ok = window.confirm(
      `Are you sure, you want to delete '${targetWebtoonObj.title}' ?`
    );
    if (ok) {
      await dbService
        .collection(userObj.uid)
        .doc(siteName)
        .collection(targetWebtoonObj.day)
        .doc(targetWebtoonObj.title)
        .delete();
    }
  };

  const updateInfo = useCallback(async () => {
    const html = await axios.get(URL);
    const $ = await cheerio.load(html.data);
    setUpdataDay($("td.num:first").text());
    if ($("td.title:first").children("img").attr("alt") === "UP") {
      setIsUpdate(true);
    }
  }, [URL, axios, cheerio]);

  useEffect(() => {
    if (favorite === false) {
      updateInfo();
    }
  }, [updateInfo, favorite]);

  return (
    <span className="favorite-area">
      {favorite ? (
        <>
          <i className="fas fa-heart" onClick={addToFirebase}></i>
        </>
      ) : (
        <>
          {isUpdate && <span className="update-badge">UP</span>}
          <span className="update-day">{updateDay}</span>
          <i className="far fa-trash-alt" onClick={delteToFirebase}></i>
        </>
      )}
    </span>
  );
};
export default Badge;
