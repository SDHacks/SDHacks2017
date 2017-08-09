import * as Types from './types';

export const enableEditing = () => ({
  type: Types.ENABLE_EDITING
});

export const disableEditing = () => ({
  type: Types.DISABLE_EDITING
});

export const toggleEditing = () => ({
  type: Types.TOGGLE_EDITING
});

export const addFilter = (name, displayName) => ({
  type: Types.ADD_FILTER,
  name,
  displayName
});

export const removeFilter = (name) => ({
  type: Types.REMOVE_FILTER,
  name
});

export const enableFilter = (name) => ({
  type: Types.ENABLE_FILTER,
  name
});

export const disableFilter = (name) => ({
  type: Types.DISABLE_FILTER,
  name
});

export const toggleFilter = (name) => ({
  type: Types.TOGGLE_FILTER,
  name
});

export const addFilterOption = (name, option) => ({
  type: Types.ADD_FILTER_OPTION,
  name,
  option
});

export const removeFilterOption = (name, option) => ({
  type: Types.REMOVE_FILTER_OPTION,
  name,
  option
});

export const enableFilterOption = (name, option) => ({
  type: Types.ENABLE_FILTER_OPTION,
  name,
  option
});

export const disableFilterOption = (name, option) => ({
  type: Types.DISABLE_FILTER_OPTION,
  name,
  option
});

export const toggleFilterOption = (name, option) => ({
  type: Types.TOGGLE_FILTER_OPTION,
  name,
  option
});

export const selectAllOptions = (name) => ({
  type: Types.SELECT_ALL_FILTER_OPTIONS,
  name
});

export const selectNoneOptions = (name) => ({
  type: Types.SELECT_NONE_FILTER_OPTIONS,
  name
});
