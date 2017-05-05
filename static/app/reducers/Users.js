const user = (state, action) => {
  switch (action.type) {
    case 'ADD_USERS':
    console.log("Adding users reduced");
      return action.users;
    default:
      return state;
  }
};

const users = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USERS':
      return [
        ...state,
        ...user(undefined, action)
      ];
    default:
      return state;
  }
};

export default users;
