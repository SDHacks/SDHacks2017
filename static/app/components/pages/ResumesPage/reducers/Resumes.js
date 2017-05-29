import * as ActionTypes from '../actions/types';

const initialState = {
  applicants: []
};

const resumes = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.REPLACE_APPLICANTS:
    return {...state, applicants: [
      ...action.applicants
    ]};
  default:
    return state;
  }
};

export default resumes;
