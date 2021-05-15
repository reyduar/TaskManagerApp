import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import DashboardRouter from "./DashboardRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { useAuth } from "../hooks";

const AppRouter = () => {
  const { auth } = useAuth();
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={Login}
            isAuthenticated={auth.logged}
          />
          <PublicRoute
            exact
            path="/register"
            component={Register}
            isAuthenticated={auth.logged}
          />
          <PrivateRoute
            path="/"
            component={DashboardRouter}
            isAuthenticated={auth.logged}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
