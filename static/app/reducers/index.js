import auth from './Auth';
import columns from './Columns';
import {combineReducers} from 'redux';
import filter from './Filter';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import users from './Users';

export default combineReducers({
  auth,
  columns,
  filter,
  users,
  router: routerReducer,
  form: formReducer
});
