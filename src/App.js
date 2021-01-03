import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import ProtectedRoute from './protected_routes.js'
import Login from './account/authentication/login';
import RegisterUser from './account/authentication/register'
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
import Layout from './layouts/layout';
import Sale from './invoice/view/sale';
import SaleList from './invoice/view/salelist';
import EnteriesReports from './reporting/views/enteries';
import ExitsReports from './reporting/views/exits';
import BusinessDetails from './businesses/businessDetails';
import SessionExpired from './helpers/sessionexpired';
import Index from './layouts';
function App() {
  let user = sessionStorage.getItem("User"); 
  return (
    <BrowserRouter>
        <Route path="/" exact component={Index} />
        <Route path="/login" exact component={Login} />
        <Route path="/sessionExpired" exact component={SessionExpired} />
        <Route path="/registerUser" exact strict component={RegisterUser}/>
        <ProtectedRoute path="/purchaseInvoices" layout={Layout} component={PurchaseList} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/roles" layout={Layout} component={Role} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/users" layout={Layout} component={UserList} auth={user ? user.Token !== "" ? "true" : "false" : "false"} />
        <ProtectedRoute path="/items"  layout={Layout} component={Item} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/categories" layout={Layout} component={Categories} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/units" layout={Layout} component={Units} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/types" layout={Layout} component={Types} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/collaborations" layout={Layout} component={Collaboration} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/employees"  layout={Layout} component={Employee} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/storeHouses" layout={Layout} component={StoreHouse} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/EP" layout={Layout} component={EmployeePos} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/sale" layout={Layout} component={Sale} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/salelist" layout={Layout} component={SaleList} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/exitsReports" layout={Layout} component={ExitsReports} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/enteriesReports" layout={Layout} component={EnteriesReports} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
        <ProtectedRoute path="/myProfile" layout={Layout} component={BusinessDetails} auth={user ? user.Token !== "" ? "true" : "false" : "false"}/>
    </BrowserRouter>
  );
}

export default App;
