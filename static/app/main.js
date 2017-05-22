import {applyMiddleware, createStore} from 'redux';

import {AUTH_USER} from './actions/types';
import App from './components/App';
import {CookiesProvider} from 'react-cookie';
import {Provider} from 'react-redux';
import React from 'react';
import {Router} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';
import reduxThunk from 'redux-thunk';
import {render} from 'react-dom';
import {routerMiddleware} from 'react-router-redux';
import routes from './routes';

// Create Routing with React-Router-Redux
const history = createHistory({
  basename: '/admin'
});
const routingMiddleware = routerMiddleware(history);

let store = createStore(reducer, applyMiddleware(reduxThunk),
  applyMiddleware(routingMiddleware));

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
