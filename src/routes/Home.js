import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home-mainscreen">
      <header>Webtoon Managemet</header>
      <nav>
        <span>웹툰 사이트</span>
        <div className="webtoon_site__pages">
          <div className="webtoon_site__page">
            <div className="webttoonsite__page-inner">
              <Link to="/naver">
                <button>네이버 웹툰</button>
              </Link>
            </div>
          </div>
          <div className="webtoon_site__page">
            <div className="webttoonsite__page-inner">
              <div className="webtoon_site__page-empty">...</div>
            </div>
          </div>
          <div className="webtoon_site__page">
            <div className="webttoonsite__page-inner">
              <div className="webtoon_site__page-empty">...</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
