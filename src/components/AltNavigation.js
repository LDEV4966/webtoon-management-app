import React from "react";
import { Link } from "react-router-dom";
const emptyBox = [0, 1, 2, 3, 4];
const AltNavigation = () => {
  return (
    <div id="alt-navigation-mainscreen">
      <nav>
        <div className="webtoon_site__pages">
          <div className="webtoon_site__page">
            <div className="webttoon_site__page-inner">
              <Link to="/naver">
                <img
                  src="https://play-lh.googleusercontent.com/yEh_3Tn28fJWRW6q9GkiUjl6YKNHAllQLEeQ63gS4rF5hpobUbic0jq4bS6BfP80g1E"
                  alt="naver-webtoon"
                  title="naver-webtoon"
                />
              </Link>
            </div>
          </div>
          <div className="webtoon_site__page">
            <div className="webttoon_site__page-inner">
              <Link to="/lezhin">
                <img
                  src="data:image/png;base64,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"
                  alt="lezhin-webtoon"
                  title="lezhin-webtoon"
                />
              </Link>
            </div>
          </div>
          {emptyBox.map((val, index) => {
            return (
              <div className="webtoon_site__page" key={index}>
                <div className="webttoon_site__page-inner">
                  <div className="webtoon_site__page-empty">
                    <i className="fas fa-ellipsis-h "></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AltNavigation;
