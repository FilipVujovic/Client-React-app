import React , {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { packageActions } from '../../global/global-state';
import { useDispatch } from "react-redux";


export default function AddressForm() {

    const user = useSelector((state) => state.auth.user);
    const [packages, setPackages] = useState([]);
    
    const dispatch = useDispatch();
  
    useEffect(() => {
      getPackages();
    }, []);
  
    //Request with get head can not have a body
  
  
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
    //Ovaj dispatch iz nekog razloga prosledi undefined 
    const handleChange = (event) => {
      console.log(event.target.value);
      dispatch(packageActions.setPackageState({pack : event.target.value}));
    }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            defaultValue = {user.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            defaultValue = {user.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            defaultValue = {user.adress}
          />
        </Grid>
        <Grid item xs={12}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange = {handleChange}
            >
              <MenuItem value={packages[0]}>{packages[0]}</MenuItem>
              <MenuItem value={packages[1]}>{packages[1]}</MenuItem>
              <MenuItem value={packages[2]}>{packages[2]}</MenuItem>
              <MenuItem value={packages[3]}>{packages[3]}</MenuItem>
            </Select>
          </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}