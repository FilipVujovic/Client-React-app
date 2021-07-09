import { Fragment, useState, useEffect, useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Flight from "../core/Flight";
import { IconButton, MenuItem } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
function Copyright(className) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright @ Jakarta Air "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL +
      "https://images.pexels.com/photos/3389536/pexels-photo-3389536.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1920&w=2873"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    fontFamily: "Pattaya",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    padding: theme.spacing(6),
    color: "#fff",
    fontFamily: "Pattaya",
  },
  title: {
    fontFamily: "Pattaya",
    color: "#fff",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  link: {
    color: "#fff",
    fontSize: "1rem",
  },
  chip: {
    margin: "0.5rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function Flights() {
  const classes = useStyles();
  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(1);
  const [destinationCities, setDestinations] = useState([]);
  const sortDestination = useRef();
  const history = useHistory();
  const [totalPages, setTotalPages] = useState(1);
  const [searchIndicator, setSearchIndicator] = useState();
  useEffect(() => {
    getDestinations();
    getFlights();
  }, []);

  const handleChange = (event, value) => {
    event.preventDefault();
    setPage(value);
    getFlights();
  };

  const handleDestinationChange = (event, value) => {
    event.preventDefault();
    setSearchIndicator("specificPagination");
    if (sortDestination.current.value === "None") {
      getFlights();
    }
    fetch(
      "http://localhost:9000/flightsByDestination/?city=" +
        sortDestination.current.value,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((flights) => {
        setFlights(flights);
      });
  };

  const getDestinations = () => {
    fetch("http://localhost:9000/destinations/", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json()).then((destinations) => {
        const cities = destinations.map((dest) => {
          return dest.city;
        });
        setDestinations(cities);
      });
  };

  const getFlights = () => {
    setSearchIndicator("regularPagination");
    fetch("http://localhost:9000/flights/?page=" + page, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalPages(Math.ceil(data.flights.count / 6));
        console.log(data);
        const transformedData = data.flights.rows.map((flightData) => {
          return {
            id: flightData.id,
            arrivalDate: flightData.arrivalDate,
            arrivalTime: flightData.arrivalTime,
            departureDate: flightData.departureDate,
            departureTime: flightData.departureTime,
            departureAirport: flightData.departureAirport,
            destinationId: flightData.destinationId,
            departureCity: flightData.departureCity,
          };
        });
        setFlights(transformedData);
      });
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="p"
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom
                className={classes.title}
              >
                Available flights
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <IconButton
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      <HomeIcon className={classes.icon} />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Destination
              </InputLabel>
              <Select
                native
                onChange={handleDestinationChange}
                label="Destination"
                inputProps={{
                  name: "destination",
                  id: "outlined-age-native-simple",
                }}
                inputRef={sortDestination}
              >
                <option value="None">None</option>
                {destinationCities.map((city) => (
                  <option value={city}>{city}</option>
                ))}
              </Select>
            </FormControl>
            <Grid container spacing={4}>
              {flights.map((flight) => (
                <Grid item key={flight.id} xs={12} sm={6} md={4}>
                  <Flight
                    departureAirport={flight.departureAirport}
                    departureTime={flight.departureTime}
                    departureDate={flight.departureDate.split("T")[0]}
                    destId={flight.destinationId}
                    flightId={flight.id}
                    departureCity={flight.departureCity}
                  />
                </Grid>
              ))}
            </Grid>
            <Divider />
            {searchIndicator === "regularPagination" && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                variant="outlined"
              />
            )}
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Jakarta
          </Typography>
          <Typography variant="subtitle1" align="center">
            Jakarta Air - Since 2021
          </Typography>
          <Copyright className={classes.footer} />
        </footer>
      </div>
    </Fragment>
  );
}
