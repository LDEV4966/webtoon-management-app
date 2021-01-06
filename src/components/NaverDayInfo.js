import React from "react";
const NaverDayInfo = ({ webtoonList, day }) => {
  return (
    <div>
      <h3>{day} List</h3>
      <div>
        <ul>
          {webtoonList.map((webtoon) => (
            <li>
              <a href={webtoon.link}>
                <img src={webtoon.img} width="100px" height="100px" />
              </a>
              <span>{webtoon.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default NaverDayInfo;
