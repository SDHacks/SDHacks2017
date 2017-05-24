import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';

import userColumns from
  '~/components/pages/UsersPage/reducers/Columns';

import users from '~/components/pages/UsersPage/reducers/Users';

import auth from './Auth';
import filter from './Filter';

export default combineReducers({
  auth,
  userColumns: userColumns,
  filter,
  users: users,
  routing: routerReducer,
  form: formReducer
});
