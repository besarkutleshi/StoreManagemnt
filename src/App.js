import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import ProtectedRoute from './protected_routes.js'
import Login from './account/authentication/login';
import RegisterUser from './account/authentication/register'
import Business from './businesses/business';
function App() {
  return (
    <BrowserRouter>
        <Route path="/" exact strict component={Business} />
    </BrowserRouter>
  );
}

export default App;
