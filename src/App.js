import Main from './components/landing/Main';
import SignUp from './components/pages/Signup';
import LogIn from './components/pages/Signin'
import Flights from './components/pages/Flights'
import {Provider} from 'react-alert';
import AlertTemplate from 'react-alert-template-mui'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
// import Checkout from './components/pages/Checkout';
import Dashboard from './components/pages/dashboard/Dashboard';
import { useSelector } from "react-redux";
import Checkout from '../src/components/checkout/Checkout'
function App() {

  function PrivateRoute({ children, ...rest }) {
    let isAdmin = useSelector((state) => state.auth.isAdmin);
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAdmin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Router> 
      <Provider template = {AlertTemplate}>
     <Switch>
        <Route path= "/"  exact component = {Main}/>
        <Route path= "/signup"  component = {SignUp}/>
        <Route path= "/login"  component = {LogIn}/>
        <Route path= "/flights"  component = {Flights}/>
        {/* <Route path= "/checkout"  component = {Checkout}/> */}
        <Route path= "/checkout"  component = {Checkout}/>
        <PrivateRoute path = "/dashboard">
            <Dashboard/>
        </PrivateRoute>
     </Switch>
     </Provider>
    </Router>
  );
}

export default App;
