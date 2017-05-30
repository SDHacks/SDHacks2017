import * as Types from './types';

// Users
export const addUsers = (users) => ({
  type: Types.ADD_USERS,
  users
});

//Columns
export const addColumn = (column) => ({
  type: Types.ADD_COLUMN,
  column
});

export const removeColumn = (columnName) => ({
  type: Types.REMOVE_COLUMN,
  columnName
});
