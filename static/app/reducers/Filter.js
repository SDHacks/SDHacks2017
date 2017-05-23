import * as ActionTypes from '../actions/types';

const initialState = '';

const filter = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SET_FILTER:
    return action.filter;
  default:
    return state;
  }
};

export default filter;
