import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Admin from './components/Admin';
import Apply from './components/Apply';
import NotFoundPage from './components/pages/NotFound';

export default (
  <Switch>
    <Route path="/admin" component={Admin} />
    <Route path="/apply" component={Apply} />
    <Route component={NotFoundPage} />
  </Switch>
);
