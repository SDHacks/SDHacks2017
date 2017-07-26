import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Admin from './components/apps/Admin';
import Apply from './components/apps/Apply';

export default (
  <Switch>
    <Route path="/admin" component={Admin} />
    <Route path="/apply" component={Apply} />
  </Switch>
);
