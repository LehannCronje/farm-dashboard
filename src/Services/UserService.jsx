import { ApiPost, ApiGet } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";
import {
  saveUserDetails,
  InsertToken,
} from "Services/Redux/actions/SignInUser";

export const userAuth = (data) => {
  return ApiPost("auth/signin", data)
    .then((res) => {
      store.dispatch(InsertToken(res.data.token));
      localStorage.setItem("jwt-token", res.data.token);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const checkUser = () => {
  store.getState();
  return ApiGet("user/me")
    .then((res) => {
      console.log(store);
      if (!store.currentUser) {
        store.dispatch(saveUserDetails(res.data));
      }
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const addUser = (data) => {
  let url = "worker-group/farm-employee/create-user";
  return ApiPost(url, data);
};

export const getUsers = () => {
  let url = "user/user-registry";
  return ApiGet(url).then((res) => {
    return res.data;
  });
};
