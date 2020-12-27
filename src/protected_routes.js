import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component,layout:Layout, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === "true"
            ? <Layout><Component {...props}/></Layout>
            : <Redirect to='/' />
    )} />
)

export default ProtectedRoute;