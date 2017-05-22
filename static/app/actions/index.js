import * as Auth from '../data/Auth';
import * as Types from './types';

import Cookies from 'universal-cookie';
import Q from 'q';

const cookies = new Cookies();

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

// Auth
export function registerUser({username, password}) {
  return function(dispatch) {
    var deferred = Q.defer();

    Auth.register(username, password)
    .end((err, res) => {
      if (err) {
        deferred.reject(res.body.message);
        return errorHandler(dispatch, res.body.message, Types.AUTH_ERROR);
      }

      cookies.set('token', res.body.token, {path: '/'});
      dispatch({
        type: Types.AUTH_USER,
        username: res.body.user.username
      });
      deferred.resolve();
    });

    return deferred.promise;
  };
};

export function loginUser({username, password}) {
  return function(dispatch) {
    // Make the event return a promise
    var deferred = Q.defer();

    Auth.login(username, password)
    .end((err, res) => {
      if (err) {
        deferred.reject(res.body.message);
        return errorHandler(dispatch, res.body.message, Types.AUTH_ERROR);
      }

      cookies.set('token', res.body.token, {path: '/'});
      dispatch({
        type: Types.AUTH_USER,
        username: res.body.user.username
      });
      deferred.resolve();
    });

    return deferred.promise;
  };
};

// Users
export const addUsers = (users) => ({
  type: Types.ADD_USERS,
  users
});

// Filters
export const setFilter = (filter) => ({
  type: Types.SET_FILTER,
  filter
});

//Columns
export const addColumn = (columnName, column) => ({
  type: Types.ADD_COLUMN,
  columnName,
  column
});

export const removeColumn = (columnName) => ({
  type: Types.REMOVE_COLUMN,
  columnName
});
