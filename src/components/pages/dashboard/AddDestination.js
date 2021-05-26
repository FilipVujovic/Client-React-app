import React, { useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAlert } from "react-alert";
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

export default function AddDestinationForm() {
  const classes = useStyles();
  const airportCode = useRef();
  const airportFullName = useRef();
  const city = useRef();
  const countryCode = useRef();
  const alert = useAlert();

  function submitDestination(event) {
      event.preventDefault();
    const destinationInfo = {
        airportCode : airportCode.current.value,
        airportFullName : airportFullName.current.value,
        city : city.current.value,
        countryCode : countryCode.current.value
    };
    fetch("http://localhost:9000/add-destination" , {
        method: "POST",
        body: JSON.stringify(destinationInfo),
        headers : {
            "Content-Type": "application/json",
        }
    }).then((result) => {
        console.log(result.code);
        if(result.status === 200) {
            alert.show("Flight added successfully!", {
                title: "Success!",
              });
        } else {
            alert.show("Something went wrong! Check input data!", {
                title: "Error!",
              });
        }
    })
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Destination
        </Typography>
        <form className={classes.form} noValidate onSubmit = {submitDestination}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="airport code"
            label="Airport Code"
            name="airport code"
            inputRef = {airportCode}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="airport full name "
            label="Airport Full Name"
            id="airport full name"
            inputRef = {airportFullName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            inputRef = {city}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="country"
            label="Country code"
            name="country"
            inputRef = {countryCode}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container></Grid>
        </form>
      </div>
    </Container>
  );
}
