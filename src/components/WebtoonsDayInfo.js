import { dbService } from "fbase";
import React from "react";
const WebtoonsDayInfo = ({ webtoonList, day, userObj, siteName }) => {
  const addToFirebase = async (event) => {
    const {
      currentTarget: { parentElement },
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
      .collection(day)
      .doc(targetWebtoonObj.title)
      .set(targetWebtoonObj);
  };
  return (
    <div className="col">
      <h3 className="day"> {day} </h3>
      <div className="col_inner">
        <ul>
          {webtoonList.map((webtoon, counter) => {
            return (
              <li key={webtoon.id}>
                <div className="thumb">
                  <a href={webtoon.link} className="thumb__link">
                    <img src={webtoon.img} title={webtoon.title} alt={day} />
                  </a>
                  <span className="thumb__title">{webtoon.title}</span>
                  {siteName && (
                    <span className="favorite-area" onClick={addToFirebase}>
                      <i className="fas fa-heart" title={webtoon.title}></i>
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default WebtoonsDayInfo;
