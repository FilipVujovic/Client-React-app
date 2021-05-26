import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import imageLinks from "../../assets/imageLinks";
import { useDispatch } from "react-redux";
import { flightActions } from "../../global/global-state";
import {useSelector} from 'react-redux'
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    fontFamily : "Pattaya"
  },
  media: {
    height: 140,
  },
  elements: {
    fontFamily : "Poiret One",
    fontSize: "1.5rem"
  },
  elementsButton: {
    fontFamily : "Poiret One",
    fontSize: "1rem"
  }
  
});

const Flight = (props) => {
  const classes = useStyles();
  const [destinationCity, setCity] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  var imageLink = "";

  switch (destinationCity) {
    case "Vienna":
      imageLink = imageLinks.vienna;
      break;
    case "Berlin":
      imageLink = imageLinks.berlin;
      break;
    case "Athens":
      imageLink = imageLinks.athens;
      break;
    case "London":
      imageLink = imageLinks.london;
      break;
    case "Paris":
      imageLink = imageLinks.paris;
      break;
    case "Belgrade":
      imageLink = imageLinks.belgrade;
      break;
    default:
      imageLink = "";
  }

  useEffect(() => {
    getDestination();
  }, []);

  const getDestination = () => {
    fetch("http://localhost:9000/destinations/" + props.destId, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((destination) => {
        setCity(destination.city); // Umesto country code dodaj u bazu city da citas direktno
      });
  };
  // Kada korisnik klikne na book a ticket dugme za neki let u komponenti flights,
  // id tog leta se postavlja u redux globalno stanje.
  // Taj id se kasnije u infoform komponenti koristi da bi se dobila sva sedista koja nisu rezervisana za taj let
  // Ovo podrazumeva pravljenje endpointa na backendu koji ce obraditi ovaj zahtev
  const handleRequest = (event) => {
    event.preventDefault();
    if(!user) {
      history.push('/login');
    } else {
      dispatch(flightActions.setFlightState({ flightId: props.flightId }));
    // history.push("/checkout");
    history.push("/checkout");
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={imageLink} title="Flight" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" >
            <p>
              {props.departureCity} to {destinationCity}
            </p>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <List className = {classes.elements}>
              <ListItem>
                <p>Airport: {props.departureAirport}</p>
              </ListItem>
              <ListItem>
                <p>Date: {props.departureDate}</p>
              </ListItem>
              <ListItem>
                <p>Time: {props.departureTime}</p>
              </ListItem>
            </List>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleRequest} className = {classes.elementsButton}>
          Book a ticket!
        </Button>
      </CardActions>
    </Card>
  );
};

export default Flight;
