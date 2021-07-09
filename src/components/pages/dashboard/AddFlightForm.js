import React, { useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAlert } from "react-alert";
import FlightOutlinedIcon from "@material-ui/icons/FlightOutlined";
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
  const depDate = useRef();
  const depTime = useRef();
  const ariDate = useRef();
  const ariTime = useRef();
  const depCity = useRef();
  const depAirport = useRef();
  const airplaneId = useRef();
  const destinationId = useRef();
  const alert = useAlert();

  function submitFlight(event) {
    event.preventDefault();
    const flightInfo = {
      departureDate: depDate.current.value,
      departureTime: depTime.current.value,
      arrivalDate: ariDate.current.value,
      arrivalTime: ariTime.current.value,
      departureAirport: depAirport.current.value,
      airplaneId: airplaneId.current.value,
      destinationId: destinationId.current.value,
      departureCity: depCity.current.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (
      flightInfo.departureDate === "" ||
      flightInfo.departureTime === "" ||
      flightInfo.arrivalDate === "" ||
      flightInfo.departureAirport === "" ||
      flightInfo.airplaneId === "" ||
      flightInfo.destinationId === "" ||
      flightInfo.departureCity === "" ||
      flightInfo.arrivalTime === ""
    ) {
      alert.show("Please provide all required data!", {
        title: "Error!",
      });
      return;
    }
      fetch("http://localhost:9000/add-flight", {
        method: "POST",
        body: JSON.stringify(flightInfo),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((result) => {
        console.log(result);
        if (result.status === 200) {
          alert.show("Flight added successfully!", {
            title: "Success!",
          });
        } else {
          alert.show("Something went wrong! Check input data!", {
            title: "Error!",
          });
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FlightOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Flight
        </Typography>
        <form className={classes.form} onSubmit={submitFlight}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dep date"
            label="Departure Date"
            name="departure date"
            autoComplete="departure date"
            inputRef={depDate}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="departure time"
            label="Departure Time"
            id="dep time"
            inputRef={depTime}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="arrival date"
            label="Arrival Date"
            id="ari date"
            inputRef={ariDate}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="arrival time"
            label="Arrival Time"
            id="ari time"
            inputRef={ariTime}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="dep city"
            label="Departure City"
            id="dep city"
            inputRef={depCity}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="departure airport"
            label="Departure Airport"
            id="dep airport"
            inputRef={depAirport}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="airplane id"
            label="Airplane Id"
            id="airplaneId"
            inputRef={airplaneId}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="destination id"
            label="Destination Id"
            id="destId"
            inputRef={destinationId}
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
        </form>
      </div>
    </Container>
  );
}
