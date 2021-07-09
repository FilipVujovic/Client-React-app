import React, { useState, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
export default function AddressForm() {
  const pack = useRef("");
  const history = useHistory();
  const flightId = useSelector((state) => state.flight.flightId);
  const user = useSelector((state) => state.auth.user);
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 267,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [packages, setPackages] = useState([]);
  const [seats, setSeats] = useState([]);

  useEffect(() => {

    getPackages();
    getSeats();
    console.log(seats);
  }, []);

  //Request with get head can not have a body
  const getSeats = () => {
    fetch("http://localhost:9000/seatsbyflight/" + flightId, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const allSeats = result.map((singleSeat) => {
          return singleSeat.id;
        });
        setSeats(allSeats);
        console.log(allSeats);
      });
  };

  const getPackages = () => {
    fetch("http://localhost:9000/packages", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }) 
      .then((response) => response.json())
      .then((result) => {
        const allPackages = result.map((singleResult) => {
          return singleResult.classPackage;
        });
        setPackages(allPackages);
      });
  };

  const addTicket = (event) => {
    event.preventDefault();
    const info = {
      userId: user.id,
      seatId: seats[0],
      packageId: 0,
      price: 500,
    };
    if (pack.current.value === "Economy Premium") {
      info.packageId = 1;
    } else if (pack.current.value === "Economy Standard") {
      info.packageId = 2;
    } else if (pack.current.value === "Buisness Premium") {
      info.packageId = 3;
    } else if (pack.current.value === "Buisness Standard") {
      info.packageId = 4;
    }

    fetch("http://localhost:9000/add-ticket", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if(response.ok) history.push('/');
    });
   
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
        {user.firstName} {user.lastName}
      </Typography>
      <form className={classes.form} noValidate onSubmit={addTicket}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              inputRef={pack}
            >
              <MenuItem value={packages[0]}>{packages[0]}</MenuItem>
              <MenuItem value={packages[1]}>{packages[1]}</MenuItem>
              <MenuItem value={packages[2]}>{packages[2]}</MenuItem>
              <MenuItem value={packages[3]}>{packages[3]}</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </React.Fragment>
  );
}
