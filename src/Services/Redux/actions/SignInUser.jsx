export const saveUserDetails = (userObject) => {
  return {
    type: "SIGN_IN",
    payload: userObject,
  };
};

export const InsertToken = (token) => {
  return {
    type: "INSERT_TOKEN",
    payload: token,
  };
};
