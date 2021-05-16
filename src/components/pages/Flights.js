import {Fragment, useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Flight from '../core/Flight';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright @ Jakarta Air '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


export default function Flights() {
  const classes = useStyles();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    getFlights();
    
  }, []);

  const getFlights = () => {
      fetch('http://localhost:9000/flights', { 
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }}).then(response => response.json()).then((data) => {
           const transformedData = data.map((flightData) => {
               return {
                   id: flightData.id,
                   arrivalDate: flightData.arrivalDate,
                   arrivalTime: flightData.arrivalTime,
                   departureDate: flightData.departureDate,
                   departureTime: flightData.departureTime,
                   departureAirport: flightData.departureAirport,
                   destinationId : flightData.destinationId,
                   departureCity : flightData.departureCity
               }
           });
           setFlights(transformedData);
       });
  };

  return (
    <Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="p" variant="h3" align="center" color="textPrimary" gutterBottom>
              Available flights
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Check out our available flights!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {flights.map((flight) => (
              <Grid item key={flight.id} xs={12} sm={6} md={4}>
               <Flight 
                    departureAirport = {flight.departureAirport} 
                    departureTime = {flight.departureTime} 
                    departureDate = {flight.departureDate.split('T')[0]}
                    destId = {flight.destinationId}
                    flightId = {flight.id}
                    departureCity = {flight.departureCity}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Jakarta
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Jakarta Air - Since 2021
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </Fragment>
  );
}