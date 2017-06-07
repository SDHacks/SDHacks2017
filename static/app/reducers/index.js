import {reducer as form} from 'redux-form';
import {combineReducers} from 'redux';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';

import userColumns from
  '~/components/pages/UsersPage/reducers/Columns';

import users from '~/components/pages/UsersPage/reducers/Users';

import auth from '~/components/auth/reducers/Auth';

import dashboardStats from '~/components/pages/DashboardPage/reducers/Stats';

import admins from '~/components/pages/AdminsPage/reducers/Admins';

import resumes from '~/components/pages/ResumesPage/reducers/Resumes';

export default combineReducers({
  auth,
  admins,
  userColumns: userColumns,
  users,
  resumes,
  dashboardStats,
  form,
  loadingBar
});
