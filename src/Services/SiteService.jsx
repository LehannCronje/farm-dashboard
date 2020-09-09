import { ApiGet, ApiPost, ApiDelete } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";

export const GetSites = (farmId) => {
  let state = store.getState();
  let url = "";
  if (farmId) {
    url = `sites/${farmId}`;
  } else {
    url = `sites/${state.SaveFarmStateReducer.farmState.farmId}`;
  }

  return ApiGet(url).then((res) => {
    return res.data;
  });
};

export const PostSite = (data) => {
  let url = "sites/create";
  return ApiPost(url, data);
};

export const UpdateSite = (data) => {
  let url = "sites/update";
  return ApiPost(url, data);
};

export const deleteSite = (siteId) => {
  console.log(siteId);
  let url = "sites/" + siteId;
  return ApiDelete(url);
};
