import React from "react";
const NaverDayInfo = ({ webtoonList, day }) => {
  return (
    <div className="col">
      <h3 className="day"> {day} </h3>
      <div className="col_inner">
        <ul>
          {webtoonList.map((webtoon) => (
            <li>
              <div className="thumb">
                <a href={webtoon.link} className="thumb__link">
                  <img
                    src={webtoon.img}
                    width="100px"
                    height="100px"
                    title={webtoon.title}
                    alt={webtoon.title}
                  />
                  <div className="favorites"></div>
                </a>
                <span className="thumb__title">{webtoon.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default NaverDayInfo;
