import { Fragment, useState, useEffect  } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAlert } from "react-alert";
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
  const alert = useAlert();
  useEffect(() => {
    getFlights();
  }, []);
  const getFlights = () => {
    fetch("http://localhost:9000/flights", {
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

  const clickHandler = (event) => {
      event.preventDefault();
      const selectInfo = {
        id: select
      }
      console.log(selectInfo);
      fetch('http://localhost:9000/flights', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(selectInfo)
      }).then((response) => {
        if(response.status === 200) {
          reload();
          alert.show("Flight deleted successfully!", {
            title: "Success!",
          });
        }
      })
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
        Delete Flight
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
      <Button onClick={clickHandler}>
        <DeleteIcon className={classes.icon} />
      </Button>
    </Fragment>
  );
}
