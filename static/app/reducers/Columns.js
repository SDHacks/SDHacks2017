import * as ActionTypes from '../actions';

/*
Each state can be an object that defines:
{
  default: The default value, if no value is provided,
  prefix: To prefix any values,
  link: Converts the element into a link
  {
    url: The url to prefix the value,
    text: The text to display (defaults to url)
  },
}
*/

const initialState = {
  'firstName': {},
  'lastName': {},
  'github': {
    prefix: '@',
    link: 'https://github.com/'
  },
  'email': {},
  'university': {},
  'status': {
    default: 'No Status'
  }
};

const filter = (state = initialState, action) => {
  switch (action.type) {
  case (ActionTypes.ADD_COLUMN):
    return {
      ...state,
      [action.columnName]: action.column
    };
  case (ActionTypes.REMOVE_COLUMN):
    return Object.keys(state)
      .filter(key => key !== action.columnName)
      .reduce((result, current) => {
        result[current] = myObj[current];
        return result;
      }, {});
  }
  return state;
};

export default filter;
