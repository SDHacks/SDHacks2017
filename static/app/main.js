import {applyMiddleware, compose, createStore} from 'redux';
import {CookiesProvider} from 'react-cookie';
import {Provider} from 'react-redux';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import {render} from 'react-dom';

import reducer from './reducers';
import routes from './routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

let store = createStore(reducer,
composeEnhancers(
  applyMiddleware(reduxThunk)
));

render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        {routes}
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
