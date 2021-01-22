import { dbService } from "fbase";
import React, { useCallback, useEffect, useState } from "react";
const Badge = ({ favorite, siteName, userObj, titleId, day }) => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  const [updateDay, setUpdataDay] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  //
  const checkIsFav = useCallback(async () => {
    const exist = await (
      await dbService.doc(`${userObj.uid}/${siteName}/${day}/${titleId}`).get()
    ).exists;
    setIsFavorite(exist);
  }, [day, siteName, userObj, titleId]);

  const badgeOnClick = async (event) => {
    const {
      target: {
        parentElement: { parentElement },
      },
    } = event;
    const {
      target: { title },
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
    if (title === "pop") {
      const ok = window.confirm(
        `Are you sure, you want to delete '${targetWebtoonObj.title}' from Your Profile ?`
      );
      if (ok) {
        await dbService
          .doc(
            `${userObj.uid}/${siteName}/${targetWebtoonObj.day}/${targetWebtoonObj.titleId}`
          )
          .delete();
        if (favorite) {
          setIsFavorite((prev) => !prev);
        }
      }
    } else if (title === "push") {
      const ok = window.confirm(
        `Are you sure, you want to Add '${targetWebtoonObj.title}' to Your Profile ?`
      );
      if (ok) {
        await dbService
          .doc(
            `${userObj.uid}/${siteName}/${targetWebtoonObj.day}/${targetWebtoonObj.titleId}`
          )
          .set(targetWebtoonObj);
        if (favorite) {
          setIsFavorite((prev) => !prev);
        }
      }
    } else {
      console.log("target Name is undefined");
    }
  };

  const updateInfo = useCallback(async () => {
    const html = await axios.get(
      `https://comic.naver.com/webtoon/list.nhn?titleId=${titleId}`
    );
    const $ = await cheerio.load(html.data);
    setUpdataDay($("td.num:first").text());
    if ($("td.title:first").children("img").attr("alt") === "UP") {
      setIsUpdate(true);
    }
  }, [titleId, axios, cheerio]);

  useEffect(() => {
    if (favorite === false) {
      updateInfo();
    } else {
      checkIsFav();
    }
  }, [updateInfo, favorite, checkIsFav]);

  return (
    <span className="favorite-area">
      {favorite ? (
        <>
          {isFavorite ? (
            <i
              className="fas fa-heart active"
              onClick={badgeOnClick}
              title="pop"
            ></i>
          ) : (
            <i
              className="far fa-heart non-active"
              onClick={badgeOnClick}
              title="push"
            ></i>
          )}
        </>
      ) : (
        <>
          {isUpdate && <span className="update-badge">UP</span>}
          <span className="update-day">{updateDay}</span>
          <i
            className="far fa-trash-alt delete-btn"
            onClick={badgeOnClick}
            title="pop"
          ></i>
        </>
      )}
    </span>
  );
};
export default Badge;
