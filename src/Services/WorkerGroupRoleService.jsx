import { ApiGet } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";

export const getWorkerGroupRoles = () => {
  let state = store.getState();
  let url = `employee-role/`;
  return ApiGet(url).then((res) => {
    return res.data;
  });
};
