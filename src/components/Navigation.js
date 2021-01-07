import { authService } from "fbase";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navigation = () => {
  const history = useHistory();

  const onClick = async () => {
    await authService.signOut();
    history.push("/");
  };

  return (
    <nav id="navigation-screen">
      <span className="app-title">WEBTOON MANAGER</span>
      <ul className="navigation">
        <li className="navigation__list">
          <Link to="/">Home</Link>
        </li>
        <li className="navigation__list">
          <Link to="/profile">My Profile</Link>
        </li>
        <li className="navigation__list">
          <button onClick={onClick}>Log out</button>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
