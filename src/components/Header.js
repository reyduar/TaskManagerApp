import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import ViewListIcon from "@material-ui/icons/ViewList";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import { useAuth } from "../hooks";
import { type } from "../types/types";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function Header() {
  const { auth } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const { user, dispatch } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogon = () => {
    history.replace("/login");
    dispatch({
      type: type.LOGOUT,
    });
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Task Manager{" "}
          {auth && (
            <small>{`User Logged: ${auth.firstName} ${auth.lastName}`}</small>
          )}
        </Typography>
        <nav>
          <Link
            variant="button"
            color="textPrimary"
            to="/"
            component={RouterLink}
            className={classes.link}
          >
            Home
          </Link>
        </nav>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="primary"
          variant="outlined"
          className={classes.link}
          endIcon={<AccountCircleIcon />}
        >
          {auth.emailAddress}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={onLogon}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
