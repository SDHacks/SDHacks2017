// Users
export const ADD_USERS = 'ADD_USERS';

export const addUsers = (users) => ({
  type: ADD_USERS,
  users
});

// Filters
export const SET_FILTER = 'SET_FILTER';

export const setFilter = (filter) => ({
  type: SET_FILTER,
  filter
});

//Columns
export const ADD_COLUMN = 'ADD_COLUMN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';

export const addColumn = (columnName, column) => ({
  type: ADD_COLUMN,
  columnName,
  column
});

export const removeColumn = (columnName) => ({
  type: REMOVE_COLUMN,
  columnName
});
