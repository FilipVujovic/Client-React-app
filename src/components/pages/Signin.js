import { React, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { authActions } from "../../global/global-state";
import { useDispatch } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright @ Jakarta Air "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const email = useRef("");
  const password = useRef("");
  const history = useHistory();
  const alert = useAlert();

  const dispatch = useDispatch();

  async function signIn(event) {
    event.preventDefault();
    const loginInfo = {
      email: email.current.value,
      password: password.current.value,
    };
    if(loginInfo.email === '' || loginInfo.password === '') {
      console.log(loginInfo.email.split("@"));
      alert.show("Please enter all required data!", {
        title: "Incorrect input!",
      });
      return;
    }

    const response = await fetch("http://localhost:9000/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      history.push("/");
      return response.json().then((data) => {
        console.log(data.idCode);
        dispatch(
          authActions.login({
            isAuth: data.isLoggedIn,
            isAdmin: data.isAdmin,
            user: data.user,
          })
        );
      });
    }
    if (response.status === 400) {
      alert.show("Incorrect username or password!", {
        title: "Incorrect input!",
      });
    }
  }
  return (
    <Container component="main" maxWidth="xs" className = {classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={signIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
