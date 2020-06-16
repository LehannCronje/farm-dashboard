let initialState = {
  currentUser: {
    roles: [],
    username: "",
    token: "",
  },
};

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return Object.assign({}, state, {
        ...state,
        currentUser: {
          ...state.currentUser,
          roles: action.payload.roles,
          username: action.payload.username,
        },
      });
    case "INSERT_TOKEN":
      return Object.assign({}, state, {
        ...state,
        currentUser: {
          token: action.payload,
        },
      });
    default:
      return state;
  }
};

export default signInReducer;
