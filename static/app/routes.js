import React from 'react';
import {Route, Switch} from 'react-router-dom';

import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './components/pages/DashboardPage';
import HomePage from './components/pages/HomePage';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import NotFoundPage from './components/pages/NotFound';
import Register from './components/auth/Register';
import RequireAuth from './components/auth/RequireAuth';
import UsersPage from './components/pages/UsersPage';

export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />

    <PrivateRoute path="/logout" component={Logout} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/users" component={UsersPage} />

    <Route component={NotFoundPage} />
  </Switch>
);
