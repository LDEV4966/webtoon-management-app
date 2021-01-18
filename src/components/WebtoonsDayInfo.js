import React, { useCallback, useEffect, useState } from "react";
import Badge from "./Badge";
const WebtoonsDayInfo = ({ webtoonList, day, userObj, siteName, favorite }) => {
  const [isToday, setIsToday] = useState(false);
  const setTodayInfo = useCallback(() => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let today = new Date();
    if (day === days[today.getDay()]) {
      setIsToday(true);
    }
  }, [day]);
  useEffect(() => {
    setTodayInfo();
  }, [setTodayInfo]);
  return (
    <div className={"col" + (isToday ? " today-col" : "")}>
      <h3 className={"day"}> {day} </h3>
      <div className="col_inner">
        <ul>
          {webtoonList.map((webtoon, counter) => {
            return (
              <li key={counter}>
                <div className="thumb">
                  <a href={webtoon.link} className="thumb__link">
                    <img
                      src={webtoon.img}
                      title={webtoon.title}
                      alt={webtoon.titleId + "/" + day} // webtoonID and webtoonDay
                    />
                  </a>
                  <span className="thumb__title">{webtoon.title}</span>
                  <Badge
                    key={webtoon.titleId}
                    titleId={webtoon.titleId}
                    favorite={favorite}
                    siteName={siteName}
                    userObj={userObj}
                  />
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
