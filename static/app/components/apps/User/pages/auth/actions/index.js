import * as Auth from '~/data/Auth';

import * as Types from './types';

import Cookies from 'universal-cookie';
import Q from 'q';

import CookieTypes from '~/static/Cookies';

const cookies = new Cookies();

function storeLogin(res) {
  cookies.set(CookieTypes.user.token, res.body.token, {path: '/'});
  cookies.set(CookieTypes.user.user, res.body.user, {path: '/'});
}

export function errorHandler(dispatch, error, type) {
  let errorMessage = error.message;

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: 'The username or password you entered was not correct.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export function removeError(dispatch) {
  dispatch({
    type: Types.REMOVE_ERROR
  });
}

export function loginUser({username, password}) {
  return function(dispatch) {
    // Make the event return a promise
    var deferred = Q.defer();
    removeError(dispatch);

    Auth.login(username, password)
    .end((err, res) => {
      if (err) {
        deferred.reject(res.error.message);
        return errorHandler(dispatch, res.error, Types.AUTH_ERROR);
      }

      storeLogin(res);
      dispatch({
        type: Types.AUTH_USER,
        payload: res.body.user
      });
      deferred.resolve();
    });

    return deferred.promise;
  };
};

export function logoutUser() {
  return function(dispatch) {
    dispatch({type: Types.UNAUTH_USER});
    cookies.remove(CookieTypes.user.token, {path: '/'});
    cookies.remove(CookieTypes.user.user, {path: '/'});
  };
};
