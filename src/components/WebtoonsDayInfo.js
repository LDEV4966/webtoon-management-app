import React, { useEffect, useState } from "react";
import Badge from "./Badge";
const WebtoonsDayInfo = ({ webtoonList, day, userObj, siteName, favorite }) => {
  const [todayDay, setTodayDay] = useState(false);
  useEffect(() => {
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    let today = new Date();
    let todayYear = today.getFullYear(); // 년도
    let todayMonth = today.getMonth() + 1; // 월
    let todayDate = today.getDate(); // 날짜
    if (day === days[today.getDay() - 1]) {
      setTodayDay(true);
    }
  }, []);
  return (
    <div className={"col" + (todayDay ? " today-col" : "")}>
      <h3 className={"day"}> {day} </h3>
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
                  <Badge
                    key={webtoon.id}
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
