import React from "react";
import Profile from "routes/Profile";
import Home from "routes/Home";
import Naver from "routes/Naver";
import Auth from "routes/Auth";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn , userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj}/>
            </Route>
            <Route exact path="/naver">
              <Naver userObj={userObj}/>
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
