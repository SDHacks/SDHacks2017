import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {loadAllUsers} from './data/Users';
import {addUsers} from './actions';
import reducer from './reducers';
import App from './components/App.js';

let store = createStore(reducer);

loadAllUsers().end((err, res) => {
  var users = res.body;
  store.dispatch(addUsers(users));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
