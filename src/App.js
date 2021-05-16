
import Header from './components/layout/Header';
import SignUp from './components/pages/Signup';
import Home from './components/pages/Home';
import LogIn from './components/pages/Signin'
import Flights from './components/pages/Flights'
import {Provider} from 'react-alert';
import AlertTemplate from 'react-alert-template-mui'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Checkout from './components/pages/Checkout';
function App() {
  return (
    <Router> 
      <Provider template = {AlertTemplate}>
      <Header/>
     <Switch>
        <Route path= "/"  exact component = {Home}/>
        <Route path= "/signup"  component = {SignUp}/>
        <Route path= "/login"  component = {LogIn}/>
        <Route path= "/flights"  component = {Flights}/>
        <Route path= "/checkout"  component = {Checkout}/>
     </Switch>
     </Provider>
    </Router>
   
  );
}

export default App;
