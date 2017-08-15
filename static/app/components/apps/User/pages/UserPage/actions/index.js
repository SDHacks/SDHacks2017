import * as Api from '~/data/Auth';

import * as Types from './types';

import Q from 'q';

// User
export const updateCurrentUser = (user) => ({
  type: Types.UPDATE_CURRENT_USER,
  user
});

// Get the current user information
export const getCurrentUser = () => (dispatch) => {
  var deferred = Q.defer();
  Api.getCurrentUser()
  .then((res) => {
    dispatch(updateCurrentUser(res.body));
    deferred.resolve();
  })
  .catch(deferred.reject);
  return deferred.promise;
};

