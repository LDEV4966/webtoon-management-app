import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home-mainscreen">
      <h3>Webtoon sites</h3>
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
            <span className="webtoon_site__title">Naver</span>
          </div>
          <div className="webtoon_site__page">
            <div className="webttoon_site__page-inner">
              <div className="webtoon_site__page-empty">
                <i className="fas fa-ellipsis-h fa-lg"></i>
              </div>
            </div>
          </div>
          <div className="webtoon_site__page">
            <div className="webttoon_site__page-inner">
              <div className="webtoon_site__page-empty">
                <i className="fas fa-ellipsis-h fa-lg"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="webtoon_site__pages">
          <div className="webtoon_site__page">
            <div className="webttoon_site__page-inner">
              <div className="webtoon_site__page-empty">
                <i className="fas fa-ellipsis-h fa-lg"></i>
              </div>
            </div>
          </div>
          <div className="webtoon_site__page">
            <div className="webttoon_site__page-inner">
              <div className="webtoon_site__page-empty">
                <i className="fas fa-ellipsis-h fa-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
