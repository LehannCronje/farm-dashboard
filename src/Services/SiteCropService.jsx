import { ApiGet, ApiPost } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";
import { ApiDelete } from "Utils/ApiUtil";

export const GetSiteCrops = (farmId) => {
  let state = store.getState();
  console.log(state);
  let url = `site-crop/farm/${state.SaveFarmStateReducer.farmState.farmId}/site/${state.SaveFarmStateReducer.farmState.siteId}`;
  return ApiGet(url)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return "error";
    });
};

export const PostCrop = (data) => {
  let url = "crop/create";
  return ApiPost(url, data);
};

export const deleteSiteCrop = (cropId) => {
  let state = store.getState();
  console.log(state);
  let url = `site-crop/crop/${cropId}/site/${state.SaveFarmStateReducer.farmState.farmSiteId}`;
  return ApiDelete(url);
};
