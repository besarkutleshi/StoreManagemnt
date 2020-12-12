import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import ProtectedRoute from './protected_routes.js'
import Login from './account/authentication/login';
import RegisterUser from './account/authentication/register'
import Business from './businesses/business';
import Role from './account/authorization/views/role.jsx';
import UserList from './account/authentication/views/user.list';
import Item from './item/views/item';
import Collaboration from './collaboration/collaboration.jsx'
import Employee from './collaboration/employee';
import StoreHouse from './collaboration/store.house';
import EmployeePos from './collaboration/employee.pos';
import PurchaseList from './invoice/view/purchase';
import Categories from './item/views/category'
import Units from './item/views/unit'
import Types from './item/views/type'
function App() {
  let user = sessionStorage.getItem("User"); 
  return (
    <BrowserRouter>
        <Route path="/" exact strict component={Login} />
        <Route path="/registerUser" exact strict component={RegisterUser} />
        <ProtectedRoute path="/purchaseInvoices" component={PurchaseList} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/roles" component={Role} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/users" component={UserList} auth={user ? user.Token !== "" ? "true" : "false" : "false"} />
        <ProtectedRoute path="/items" component={Item} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/categories" component={Categories} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/units" component={Units} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/types" component={Types} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/collaborations" component={Collaboration} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/employees" component={Employee} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/storeHouses" component={StoreHouse} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/EP" component={EmployeePos} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
    </BrowserRouter>
  );
}

export default App;
