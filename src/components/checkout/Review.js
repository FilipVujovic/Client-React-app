import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const flightId = useSelector((state) => state.flight.flightId);
  const [flight, setFlight] = useState({});

  useEffect(() => {
    getFlight();
  }, []);

  const getFlight = () => {
    fetch("http://localhost:9000/flightById/" + flightId, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setFlight(result);
      });
    console.log(flight);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem} key={flight.id}>
          <ListItemText primary="Departure Date" />
          <Typography variant="subtitle1" className={classes.total}>
            {flight.departureDate}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={flight.id}>
          <ListItemText primary="Departure Time" />
          <Typography variant="subtitle1" className={classes.total}>
            {flight.departureTime}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={flight.id}>
          <ListItemText primary="Departure City" />
          <Typography variant="subtitle1" className={classes.total}>
            {flight.departureCity}
          </Typography> 
        </ListItem>
        <ListItem className={classes.listItem} key={flight.id}>
          <ListItemText primary="Departure Airport" />
          <Typography variant="subtitle1" className={classes.total}>
            {flight.departureAirport}
          </Typography> 
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Customer information
          </Typography>
          <Typography gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography gutterBottom>{user.adress}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
