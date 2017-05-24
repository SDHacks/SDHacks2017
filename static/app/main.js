import {applyMiddleware, compose, createStore} from 'redux';
import {CookiesProvider} from 'react-cookie';
import {Provider} from 'react-redux';
import React from 'react';
import {Router} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import reduxThunk from 'redux-thunk';
import {render} from 'react-dom';
import {routerMiddleware} from 'react-router-redux';

import App from './components/App';
import reducer from './reducers';
import routes from './routes';

// Create Routing with React-Router-Redux
const history = createHistory({
  basename: '/admin'
});
const routingMiddleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

let store = createStore(reducer, composeEnhancers(
  applyMiddleware(reduxThunk, routingMiddleware)));

render(
  <CookiesProvider>
    <Provider store={store}>
      <App>
        <Router history={history}>
          {routes}
        </Router>
      </App>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
