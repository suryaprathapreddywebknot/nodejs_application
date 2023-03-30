import logo from './logo.svg';
import './App.css';
import LoginNavbar from './components/login/LoginNavbar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/signup';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path='/' exact>
        <Redirect to='/login'></Redirect>
      </Route>
      <Route path='/login' exact><Login></Login></Route>
      <Route path='/signup' exact>
        <Signup></Signup>
      </Route>
    </Switch>
  );
}

export default App;
