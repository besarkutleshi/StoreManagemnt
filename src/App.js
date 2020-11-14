import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import ProtectedRoute from './protected_routes.js'
import Login from './account/authentication/login';
function App() {
  return (
    <BrowserRouter>
        <Route path="/" exact strict component={Login} />
    </BrowserRouter>
  );
}

export default App;
