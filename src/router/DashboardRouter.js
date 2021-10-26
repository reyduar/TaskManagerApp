import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import TestTemplateForm from "../pages/TestTemplateForm";

const DashboardRouter = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/testCase" component={TestTemplateForm} />
        <Redirect to="/home" />
      </Switch>
    </>
  );
};

export default DashboardRouter;
