import * as ActionTypes from '../actions/types';

/*
Each state can be an object that defines:
{
  name: The text to show on the page, required
  default: The default value, if no value is provided,
  prefix: To prefix any values,
  link: Converts the element into a link
  {
    url: The url to prefix the value,
    text: The text to display (defaults to url)
  },
}
*/

const initialState = [
  {
    data: 'firstName',
    name: 'First Name',
    key: true
  },
  {
    data: 'lastName',
    name: 'Last Name'
  },
  {
    data: 'github',
    name: 'Github',
    prefix: '@',
    link: 'https://github.com/'
  },
  {
    data: 'email',
    name: 'Email'
  },
  {
    data: 'university',
    name: 'University'
  },
  {
    data: 'status',
    name: 'Status',
    default: 'No Status'
  }
];

const userColumns = (state = initialState, action) => {
  switch (action.type) {
  case (ActionTypes.ADD_COLUMN):
    return [
      ...state,
      action.column
    ];
  case (ActionTypes.REMOVE_COLUMN):
    return Object.values(state)
      .filter(key => key.data !== action.columnName);
  }
  return state;
};

export default userColumns;
