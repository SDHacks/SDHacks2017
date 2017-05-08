import {combineReducers} from 'redux';
import users from './Users';
import filter from './Filter';

export default combineReducers({
  users,
  filter
});
