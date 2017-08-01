import {applyMiddleware, compose, createStore} from 'redux';
import {CookiesProvider} from 'react-cookie';
import {Provider} from 'react-redux';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import {render} from 'react-dom';
import LoadingBar from 'react-redux-loading-bar';

import reducer from './reducers';
import routes from './routes';

import 'jquery';
import 'bootstrap/dist/js/bootstrap';

// Required for Redux Devtools Chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

// Create Redux store with middlewares
let store = createStore(reducer,
composeEnhancers(
  applyMiddleware(reduxThunk)
));

render(
  <CookiesProvider>
    <Provider store={store}>
      <div className="h-100">
        <LoadingBar className="loading-bar" />
        <Router>
          {routes}
        </Router>
      </div>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
