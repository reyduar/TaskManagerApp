import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Header from "../components/Header";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
