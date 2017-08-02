import React from 'react';
import {Route, Switch} from 'react-router-dom';

import FullRedirect from './components/FullRedirect';
import Admin from './components/apps/Admin';
import Apply from './components/apps/Apply';
import User from './components/apps/User';

/**
 * Main routing for React application.
 */
export default (
  <Switch>
    <Route path="/admin" component={Admin} />
    <Route path="/apply" component={Apply} />
    <Route path="/user" component={User} />
    <FullRedirect from="/login" to="/user/login" />
    <FullRedirect from="/logout" to="/user/logout" />
  </Switch>
);
