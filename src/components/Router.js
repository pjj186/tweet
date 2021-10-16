import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const Router = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
          </>
        ) : (
          <Route exact path="/" component={Auth} />
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
