import React, {useState, useEffect, useRef, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AuthContext from '../../global/auth-context';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function AddressForm() {
    const context = useContext(AuthContext);
    const firstName = useRef('');
    const lastName = useRef('');
    const adress = useRef('');
    const seat = useRef('');
    const pack = useRef('');
    


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


    useEffect(() => {
        getPackages();
        
      }, []);


    const getPackages = () => {
        fetch('http://localhost:9000/packages', { 
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }}).then(response => response.json()).then((result) => {
           const allPackages = result.map((singleResult) => {
                return singleResult.classPackage;
           });
           setPackages(allPackages);
       })
    };

    const addTicket = () => {
      const info = {
        userId : context.user.id,
        seatId : seat.current.value,
        packageId : 0,
        price : 500,
    }
        if(pack.current.value === "Economy Premium") {
          info.packageId = 1;
        } else if (pack.current.value === "Economy Standard") {
          info.packageId = 2;
        } else if (pack.current.value === "Buisness Premium") {
          info.packageId = 3;
        } else if (pack.current.value === "Buisness Standard") {
          info.packageId = 4
        }
      
    const response = fetch('http://localhost:9000/add-ticket', {
            method: 'POST',
            body: JSON.stringify(info), 
            headers : { 
                'Content-Type': 'application/json'
               }
        }).then((response) => {
            console.log(response);
        });
        if(response.ok) {
            console.log(response);
        }
        
    }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align = "center">
        Passenger info
      </Typography>
      <form className={classes.form} noValidate onSubmit = {addTicket}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef = {firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef = {lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                autoComplete="address"
                inputRef = {adress}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="seat"
                label="Seat Number"
                id="seat"
                autoComplete="seat"
                inputRef = {seat}
              />
            </Grid>
        
        <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                inputRef = {pack}
            >
             <MenuItem value={packages[0]}>{packages[0]}</MenuItem>
             <MenuItem value={packages[1]}>{packages[1]}</MenuItem>
             <MenuItem value={packages[2]}>{packages[2]}</MenuItem>
             <MenuItem value={packages[3]}>{packages[3]}</MenuItem>
        </Select>
        
          </Grid>
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
    </React.Fragment>
  );
}