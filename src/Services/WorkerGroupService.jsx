import { ApiGet, ApiPost } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";
import { ApiDelete } from "Utils/ApiUtil";

export const GetWorkerGroup = () => {
  let state = store.getState();
  let url = `worker-group/${state.SaveFarmStateReducer.farmState.farmId}`;
  return ApiGet(url).then((res) => {
    return res.data;
  });
};

export const PostWorkerGroup = (data) => {
  let url = "worker-group/";
  return ApiPost(url, data);
};

export const getWorkerGroupEmployees = () => {
  let state = store.getState();
  let url = `worker-group/farm-employees/${state.SaveFarmStateReducer.farmState.workerGroupId}`;
  return ApiGet(url).then((res) => {
    return res.data;
  });
};

export const addWorkerGroupEmployee = (data) => {
  let url = "worker-group/farm-employees/";
  return ApiPost(url, data);
};

export const deleteWorkerGroup = (workerGroupId) => {
  let url = "worker-group/" + workerGroupId;
  return ApiDelete(url);
};
