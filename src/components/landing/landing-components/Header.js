import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Collapse, IconButton, Toolbar } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-scroll";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../global/global-state";
const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "none",
    fontFamily: "Pattaya",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  colorText: {
    color: "#1ABC9C",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Pattaya",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "Pattaya",
    fontSize: "4rem",
  },
  container: {
    textAlign: "center",
  },
  goDownIcon: {
    color: "#fff",
    fontSize: "4rem",
  },
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const logoutHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:9000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        dispatch(authActions.logout());
        history.push("/");
      }
    });
  };

  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            Air <span className={classes.colorText}>Jakarta</span>
          </h1>
          {!isAuth && (
            <IconButton onClick={() => history.push("/login")}>
              <AccountCircleOutlinedIcon className={classes.icon} />
            </IconButton>
          )}
          {isAdmin && (
            <IconButton onClick={() => history.push("/dashboard")}>
              <DashboardOutlinedIcon className={classes.icon} />
            </IconButton>
          )}
          {isAuth && (
            <IconButton onClick={logoutHandler}>
              <ExitToAppOutlinedIcon className={classes.icon} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={15}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br /> Air{" "}
            <span className={classes.colorText}>Jakarta.</span>
          </h1>
          <Link to="content" smooth={true}>
            <IconButton>
              <ArrowDropDownIcon className={classes.goDownIcon} />
            </IconButton>
          </Link>
        </div>
      </Collapse>
    </div>
  );
}
