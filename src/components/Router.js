import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route>
            <Auth />
          </Route>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
