import { ApiGet, ApiPost, ApiDelete } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";

export const getEmployees = () => {
  let state = store.getState();
  let url = `employee/${state.SaveFarmStateReducer.farmState.farmId}`;
  return ApiGet(url).then((res) => {
    console.log(res.data);
    return res.data;
  });
};

export const postEmployees = (data) => {
  let url = "employee/";
  return ApiPost(url, data);
};

export const deleteEmployee = (empId) => {
  let url = "employee/" + empId;
  return ApiDelete(url);
};
