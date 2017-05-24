import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';

import userColumns from
  '~/components/pages/UsersPage/reducers/Columns';

import users from '~/components/pages/UsersPage/reducers/Users';

import userFilter from '~/components/pages/UsersPage/reducers/Filter';

import auth from '~/components/auth/reducers/Auth';

import dashboardStats from '~/components/pages/DashboardPage/reducers/Stats';

export default combineReducers({
  auth,
  userColumns: userColumns,
  userFilter,
  users,
  dashboardStats,
  routing: routerReducer,
  form: formReducer
});
