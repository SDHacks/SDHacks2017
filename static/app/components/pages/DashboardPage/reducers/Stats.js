import * as ActionTypes from '../actions/types';

const initialState = {};

const stats = (state = initialState, action) => {
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

export default stats;
