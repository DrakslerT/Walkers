import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Iskalnik } from "./pages/Iskalnik/";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Iskalnik} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
