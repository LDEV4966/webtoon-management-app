import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header>Webtoon Managemet</header>
      <nav>
        <span>웹툰 사이트</span>
        <ul>
          <li>
            <Link to="/naver">
              <button>네이버 웹툰</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;