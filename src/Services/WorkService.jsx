import { ApiGet, ApiPost } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";

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
