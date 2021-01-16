import { dbService } from "fbase";
import React from "react";

const Badge = ({ favorite, siteName, userObj }) => {
  const addToFirebase = async (event) => {
    const {
      target: {
        parentElement: { parentElement },
      },
    } = event;
    const thumbLink = parentElement.firstChild;
    const thumbImg = thumbLink.firstChild;
    const targetWebtoonObj = {
      link: thumbLink.href,
      img: thumbImg.src,
      title: thumbImg.title,
      day: thumbImg.alt,
    };
    await dbService
      .collection(userObj.uid)
      .doc(siteName) // 이 정보는 현재 Naverdayinfo라서 그렇지, WebtoonSiteDayinfo 로 바꾸어서  WebtoonSite 이름을 가져 올거임.
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
    const targetWebtoonObj = {
      title: thumbImg.title,
      day: thumbImg.alt,
    };
    const ok = window.confirm(
      `Are you sure, you want to delete '${targetWebtoonObj.title}' ?`
    );
    if (ok) {
      await dbService
        .collection(userObj.uid)
        .doc(siteName) // 이 정보는 현재 Naverdayinfo라서 그렇지, WebtoonSiteDayinfo 로 바꾸어서  WebtoonSite 이름을 가져 올거임.
        .collection(targetWebtoonObj.day)
        .doc(targetWebtoonObj.title)
        .delete();
    }
  };
  return (
    <span className="favorite-area">
      {favorite ? (
        <i className="fas fa-heart" onClick={addToFirebase}></i>
      ) : (
        <i className="far fa-trash-alt" onClick={delteToFirebase}></i>
      )}
    </span>
  );
};
export default Badge;
