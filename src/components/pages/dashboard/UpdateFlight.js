import { Fragment, useState, useEffect, useRef  } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
  root: {},
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
    color: "",
    textAlign: "center",
  },
  icon: {
    color: "",
    fontSize: "2rem",
  },
  link: {
    color: "#fff",
    fontSize: "1rem",
  },
}));

export default function Flights() {
  const classes = useStyles();
  const [flights, setFlights] = useState([]);
  const [select, setSelection] = useState();
  const depDate = useRef();
  const depTime = useRef();
  const ariDate = useRef();
  const ariTime = useRef();
  const depCity = useRef();
  const depAirport = useRef();
  const airplaneId = useRef();
  const destinationId = useRef();
  const alert = useAlert();
  useEffect(() => {
    getFlights();
  }, []);
  const getFlights = () => {
    fetch("http://localhost:9000/allFlights", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((flightData) => {
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

 const reload = () => {
  getFlights();
 }

  const submitForm = (event) => {
      event.preventDefault();
      const flightInfo = {
        id: select,
        departureDate: depDate.current.value,
        departureTime: depTime.current.value,
        arrivalDate: ariDate.current.value,
        arrivalTime: ariTime.current.value,
        departureAirport: depAirport.current.value,
        airplaneId: airplaneId.current.value,
        destinationId: destinationId.current.value,
        departureCity: depCity.current.value,
      };
      if(flightInfo.id === undefined) {
        alert.show("Please select a row!", {
          title: "Error!",
        });
      }
        fetch('http://localhost:9000/updateFlight', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(flightInfo)
        }).then((response) => {
          if(response.status === 200) {
            reload();
            alert.show("Flight updated successfully!", {
              title: "Success!",
            });
          } else {
            alert.show("Something went wrong, check input data!", {
              title: "Error!",
            });
          }
        });
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "departureDate", headerName: "Departure Date", width: 150 },
    { field: "departureTime", headerName: "Departure Time", width: 150 },
    { field: "arrivalDate", headerName: "Arrival Date", width: 150 },
    { field: "arrivalTime", headerName: "Arrival Time", width: 150 },
    { field: "departureAirport", headerName: "Departure Airport", width: 150 },
    { field: "departureCity", headerName: "Departure City", width: 150 },
  ];

  return (
    <Fragment>
      <Typography component="h1" variant="h5" className={classes.title}>
        Update Flight
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={flights}
          columns={columns}
          pageSize={5}
          checkboxSelection = {true}
          onRowSelected = {e => setSelection(e.data.id)}
        />
      </div>
      <form onSubmit = {submitForm}>
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
    </Fragment>
  );
}
