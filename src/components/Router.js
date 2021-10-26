import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const Router = ({ refreshUser, userObj, setUserObject }) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {userObj && <Navigation userObj={userObj} />}
      <Switch>
        {userObj ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile
                userObj={userObj}
                setUserObject={setUserObject}
                refreshUser={refreshUser}
              />
            </Route>
          </div>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
