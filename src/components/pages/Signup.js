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
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    blockSize: "50%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "75%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const firstName = useRef("");
  const lastName = useRef("");
  const password = useRef("");
  const jmbg = useRef("");
  const adress = useRef("");
  const email = useRef("");
  const contact = useRef("");
  const history = useHistory();
  const alert = useAlert();


  async function addUser(event) {
    event.preventDefault();
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      jmbg: jmbg.current.value,
      adress: adress.current.value,
      contact: contact.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    if (
      user.firstName === "" ||
      user.lastName === "" ||
      user.jmbg === "" ||
      user.adress === "" ||
      user.contact === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      alert.show("Please provide all required data!", {
        title: "Invalid input!",
      });
      return;
    }

    const response = await fetch("http://localhost:9000/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) history.push("/");
  }

  return (
    <Container component="main" maxWidth="xs" maxHeight="50%">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={addUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="JMBG"
                label="JMBG"
                id="JMBG"
                autoComplete="JMBG"
                inputRef={jmbg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                autoComplete="address"
                inputRef={adress}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="contact"
                label="Contact"
                id="contact"
                autoComplete="contact"
                inputRef={contact}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
