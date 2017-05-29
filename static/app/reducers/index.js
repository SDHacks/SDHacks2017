import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';

import userColumns from
  '~/components/pages/UsersPage/reducers/Columns';

import users from '~/components/pages/UsersPage/reducers/Users';

import userFilter from '~/components/pages/UsersPage/reducers/Filter';

import auth from '~/components/auth/reducers/Auth';

import dashboardStats from '~/components/pages/DashboardPage/reducers/Stats';

import admins from '~/components/pages/AdminsPage/reducers/Admins';

import resumes from '~/components/pages/ResumesPage/reducers/Resumes';

export default combineReducers({
  auth,
  admins,
  userColumns: userColumns,
  userFilter,
  users,
  resumes,
  dashboardStats,
  form: formReducer
});
