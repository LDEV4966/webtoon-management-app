import React from "react";
const NaverDayInfo = ({ webtoonList, day, userObj }) => {
  const addToFirebase = (event) => {
    const {
      currentTarget: { parentElement },
    } = event;
    const thumbLink = parentElement.firstChild;
    const thumbImg = thumbLink.firstChild;
    const targetWebtoon = {
      link: thumbLink.href,
      img: thumbImg.src,
      title: thumbImg.title,
      day: thumbImg.alt,
    };
    console.log(targetWebtoon, userObj.uid);
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
                  <span className="favorite-area" onClick={addToFirebase}>
                    <i className="fas fa-heart" title={webtoon.title}></i>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default NaverDayInfo;
