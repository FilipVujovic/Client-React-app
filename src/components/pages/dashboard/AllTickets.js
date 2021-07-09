import { Fragment, useState, useEffect  } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
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
  const [tickets, setTickets] = useState([]);
//   const [select, setSelection] = useState();
  useEffect(() => {
    getTickets();
  }, []);
  const getTickets = () => {
    fetch("http://localhost:9000/tickets", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((ticketData) => {
          return {
            id: ticketData.id,
            price: ticketData.price,
            packageId: ticketData.packageId,
            userId: ticketData.userId,
            seatId: ticketData.seatId
          };
        });
        setTickets(transformedData);
      });
  };

//  const reload = () => {
//   getFlights();
//  }

//   const clickHandler = (event) => {
//       event.preventDefault();
//       const selectInfo = {
//         id: select
//       }
//       if(selectInfo.id === undefined) {
//         alert.show("Please select a row!", {
//           title: "Error!",
//         });
//       }
//         fetch('http://localhost:9000/deleteFlight', {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body : JSON.stringify(selectInfo)
//         }).then((response) => {
//           if(response.status === 200) {
//             reload();
//             alert.show("Flight deleted successfully!", {
//               title: "Success!",
//             });
//           } else {
//             alert.show("Something went wrong, check input data!", {
//               title: "Error!",
//             });
//           }
//         });
//   }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "packageId", headerName: "Package ID", width: 150 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "seatId", headerName: "Seat ID", width: 150 }
  ];

  return (
    <Fragment>
      <Typography component="h1" variant="h5" className={classes.title}>
        All Tickets
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={tickets}
          columns={columns}
          pageSize={5}
        //   onRowSelected = {e => setSelection(e.data.id)}
        />
      </div>
    </Fragment>
  );
}
