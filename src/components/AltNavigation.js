import React from "react";
import { Link } from "react-router-dom";
const emptyBox = [0, 1, 2, 3, 4, 5];
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
