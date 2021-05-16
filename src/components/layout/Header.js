import {React} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../global/global-state';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

const isAuth = useSelector((state) => state.isAuth);
const logoutHandler = () => {
  fetch('http://localhost:9000/logout', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    }
  }).then((response) => {
    if(response.ok) {
      dispatch(authActions.logout());
      history.push('/')
    }
  });
};


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={() => history.push('/')} variant="h6" className={classes.title}>
            Jakarta Air
          </Typography>
          <Button color="inherit" onClick={() => history.push('/flights')}>Available flights</Button>
          {!isAuth && (<Button color="inherit" onClick={() => history.push('/login')}>Log in</Button>)}
          {isAuth && (<Button color="inherit" onClick={logoutHandler}>Log out</Button>)}
          <Button color="inherit" onClick={() => history.push('/signup')}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}