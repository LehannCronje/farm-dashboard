import { ApiGet, ApiPost } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";

export const getEmployees = () => {
  let state = store.getState();
  let url = `employee/${state.SaveFarmStateReducer.farmState.farmId}`;
  return ApiGet(url).then((res) => {
    return res.data;
  });
};

export const postEmployees = (data) => {
  let url = "employee/";
  return ApiPost(url, data);
};
