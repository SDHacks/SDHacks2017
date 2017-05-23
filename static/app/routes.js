import {Route, Switch} from 'react-router-dom';

import ConsolePage from './components/pages/ConsolePage';
import Dashboard from './components/pages/DashboardPage';
import HomePage from './components/pages/HomePage';
import Login from './components/auth/Login';
import NotFoundPage from './components/pages/NotFound';
import React from 'react';
import Register from './components/auth/Register';
import RequireAuth from './components/auth/RequireAuth';
import UsersPage from './components/pages/UsersPage';

export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={RequireAuth(Dashboard)} />

    <Route path="/console" component={RequireAuth(ConsolePage)} />
    <Route path="/users" component={RequireAuth(UsersPage)} />

    <Route component={NotFoundPage} />
  </Switch>
);
