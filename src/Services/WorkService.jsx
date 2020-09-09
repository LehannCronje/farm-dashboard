import { ApiGet, ApiPost } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";
import { ApiDelete } from "Utils/ApiUtil";

export const GetWork = (farmId) => {
  let state = store.getState();
  let url = `work/${state.SaveFarmStateReducer.farmState.farmId}`;
  return ApiGet(url).then((res) => {
    return res.data;
  });
};

export const PostWork = (data) => {
  let url = "work/";
  return ApiPost(url, data);
};

export const deleteWork = (workId) => {
  let url = "work/" + workId;
  return ApiDelete(url);
};
