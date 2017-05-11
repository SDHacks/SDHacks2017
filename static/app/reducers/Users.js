import * as ActionTypes from '../actions';

const initialState = [];

const user = (state, action) => {
  switch (action.type) {
  case ActionTypes.ADD_USERS:
    return action.users;
  default:
    return state;
  }
};

const users = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.ADD_USERS:
    return [
      ...state,
      ...user(undefined, action)
    ];
  default:
    return state;
  }
};

export default users;
