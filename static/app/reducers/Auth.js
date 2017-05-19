import {
         AUTH_ERROR,
         AUTH_USER,
         UNAUTH_USER,
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  user: '',
  authenticated: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case AUTH_USER:
    return {...state, error: '', message: '', authenticated: true,
      user: action.username};
  case UNAUTH_USER:
    return {...state, authenticated: false, user: ''};
  case AUTH_ERROR:
    return {...state, error: action.payload};
  }

  return state;
};
