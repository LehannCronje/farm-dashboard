import { store } from "Services/Redux/stores/store";

export const getJwt = () => {
  store.getState();
  if (store.currentUser) {
    console.log(store.currentUser.token);
  }
  return localStorage.getItem("jwt-token");
};
