import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {applyMiddleware, createStore} from 'redux';

import {AUTH_USER} from './actions/types';
import Cookies from 'universal-cookie';
import {Provider} from 'react-redux';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';
import reduxThunk from 'redux-thunk';
import {render} from 'react-dom';
import routes from './routes';

// Create Routing with React-Router-Redux
const history = createHistory({
  basename: '/admin'
});
const routingMiddleware = routerMiddleware(history);

let store = createStore(reducer, applyMiddleware(reduxThunk),
  applyMiddleware(routingMiddleware));

// Check initial authentication
const cookies = new Cookies();
if (cookies.get('token')) {
  let username = cookies.get('username');
  store.dispatch({type: AUTH_USER, username: username});
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
