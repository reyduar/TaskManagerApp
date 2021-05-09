import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";

const DashboardRouter = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
    </>
  );
};

export default DashboardRouter;
