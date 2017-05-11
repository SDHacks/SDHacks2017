import {combineReducers} from 'redux';
import users from './Users';
import filter from './Filter';
import columns from './Columns';

export default combineReducers({
  users,
  filter,
  columns
});
