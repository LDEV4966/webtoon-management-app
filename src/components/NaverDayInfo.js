import React from "react";
const NaverDayInfo = ({ webtoonList, day }) => {
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
                    <img
                      src={webtoon.img}
                      title={webtoon.title}
                      alt={webtoon.title}
                    />
                  </a>
                  <span className="thumb__title">{webtoon.title}</span>
                  <span className="favorite-area">
                    <button className="favorite-btn">
                      <i className="fas fa-heart"></i>
                    </button>
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
