import {reducer as form} from 'redux-form';
import {combineReducers} from 'redux';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';

import adminReducers from './admin';
import applyReducers from './apply';

console.log(adminReducers);

export default combineReducers({
  admin: combineReducers(adminReducers),
  //apply: combineReducers(applyReducers),
  form,
  loadingBar
});
