import {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AuthContext from '../../global/auth-context';
import imageLinks from '../../assets/imageLinks';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Flight = props => {

const flightContext = useContext(AuthContext);
const classes = useStyles();
const [destinationCity, setCity] = useState('');
const history = useHistory();


var imageLink = '';

/*  
    Vrlo glup nacin da se ovaj izgled realizuje ali radi.
    Moglo je jednostavno direktno iz baze da se cita ime grada
    i da se na osnovu tog imena kupi slika iz fajla imageLinks
*/

switch(destinationCity) {
  case 'Vienna': 
        imageLink = imageLinks.vienna;
        break;
  case 'Berlin':
        imageLink = imageLinks.berlin;
        break;
  case 'Athens': 
        imageLink = imageLinks.athens;
        break;
  case 'London': 
        imageLink = imageLinks.london;
        break;
  case 'Paris':
        imageLink = imageLinks.paris;
        break;
  case 'Belgrade':
        imageLink = imageLinks.vienna;
        break;
  default:
        imageLink = '';
}


  useEffect(() => {
    getDestination();
  }, []);

const getDestination = () => {
    fetch('http://localhost:9000/destinations/' + props.destId, { 
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }}).then(response => response.json()).then((destination) => {
           setCity(destination.city); // Umesto country code dodaj u bazu city da citas direktno
       })
};
// Kada korisnik klikne na book a ticket dugme za neki let u komponenti flights,
// id tog leta se postavlja u redux globalno stanje.
// Taj id se kasnije u infoform komponenti koristi da bi se dobila sva sedista koja nisu rezervisana za taj let
// Ovo podrazumeva pravljenje endpointa na backendu koji ce obraditi ovaj zahtev
const handleRequest = () => {
  console.log(flightContext.flight);
  history.push('/checkout');
};

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageLink}
          title="Flight"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <p>{props.departureCity} to {destinationCity}</p>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <List>
                <ListItem>
                  <p>Departure Airport: {props.departureAirport}</p>
                </ListItem>
                <ListItem>
                  <p>Departure Date: {props.departureDate}</p>
                </ListItem>
                <ListItem>
                  <p>Departure Time: {props.departureTime}</p>
                </ListItem>
            </List>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick = {handleRequest}>
          Book a ticket!
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Flight;
