import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import ProtectedRoute from './protected_routes.js'
import Login from './account/authentication/login';
import RegisterUser from './account/authentication/register'
import Business from './businesses/business';
import Role from './account/authorization/views/role.jsx';
import UserList from './account/authentication/views/user.list';
function App() {
  let user = sessionStorage.getItem("User"); 
  return (
    <BrowserRouter>
        <Route path="/" exact strict component={Login} />

        <ProtectedRoute path="/roles" component={Role} auth={
          user ? user.Token !== "" ? "true" : "false" : "false"}/>

        <ProtectedRoute path="/users" component={UserList} auth={
          user ? user.Token !== "" ? "true" : "false" : "false"} />

    </BrowserRouter>
  );
}

export default App;
