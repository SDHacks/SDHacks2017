import {Route, Switch} from 'react-router-dom';

import App from './components/App';
import ConsolePage from './components/pages/ConsolePage';
import Dashboard from './components/Dashboard';
import HomePage from './components/pages/HomePage';
import Login from './components/auth/Login';
import NotFoundPage from './components/pages/NotFound';
import React from 'react';
import Register from './components/auth/Register';
import RequireAuth from './components/auth/RequireAuth';
import {Roles} from './static/Roles';

export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={RequireAuth(Dashboard)} />

    <Route path="/console" component={RequireAuth(ConsolePage)} />

    <Route component={NotFoundPage} />
  </Switch>
);
