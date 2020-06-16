import { ApiGet, ApiPost } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";

export const GetCrops = (farmId) => {
  let state = store.getState();
  let url = "";
  if (farmId) {
    url = `crop/${farmId}`;
  } else {
    url = `crop/${state.SaveFarmStateReducer.farmState.farmId}`;
  }

  return ApiGet(url)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return "error";
    });
};

export const PostCrop = (data) => {
  let url = "crop/";
  return ApiPost(url, data);
};
