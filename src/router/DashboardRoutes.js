import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";

const DashboardRoutes = () => {
  return (
    <>
      <Header />
      <div>
        <Switch>
          <Route exact path="/home" component={Home} />

          <Redirect to="/home" />
        </Switch>
      </div>
    </>
  );
};

export default DashboardRoutes;
