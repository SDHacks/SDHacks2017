import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import Admin from './components/apps/Admin';
import Apply from './components/apps/Apply';
import User from './components/apps/User';

export default (
  <Switch>
    <Route path="/admin" component={Admin} />
    <Route path="/apply" component={Apply} />
    <Route path="/user" component={User} />
    <Redirect from="/login" to="/user/login" />
  </Switch>
);
