import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Addproduct from './pages/AddProduct/Addproduct';
import Cart from './pages/Cart/Cart';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
          <Route path="/add" component={Addproduct}/>
          <Route path="/cart" component={Cart}/>
          <Route component={ErrorPage}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
