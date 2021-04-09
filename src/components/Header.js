import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import ViewListIcon from "@material-ui/icons/ViewList";
import Typography from "@material-ui/core/Typography";
import useStyles from "../UITemplate";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

function Header() {
  const { icon } = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <ViewListIcon className={icon} />
        <Typography variant="h6" color="inherit" noWrap>
          Task Manager
        </Typography>
        <Tab label="Home" to="/" component={Link} />
        <Tab label="Register" to="/register" component={Link} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
