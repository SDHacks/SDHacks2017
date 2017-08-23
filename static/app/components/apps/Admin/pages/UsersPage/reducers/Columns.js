import * as ActionTypes from '../actions/types';

const initialState = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      }
    ]
  },
  {
    columns: [
      {
        Header: 'Github',
        accessor: 'github'
      },
      {
        Header: 'Email',
        accessor: 'email'
      }
    ]
  },
  {
    columns: [
      {
        Header: 'Major',
        accessor: 'major'
      }
    ]
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
