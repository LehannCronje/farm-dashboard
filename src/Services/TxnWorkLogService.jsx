import { ApiGet } from "Utils/ApiUtil";
import { store } from "Services/Redux/stores/store";

export const getTxnWorkLogsByFarmSite = () => {
  let state = store.getState();
  let url = `txn-work-log/farm-site/${state.SaveFarmStateReducer.farmState.farmSiteId}`;
  return ApiGet(url).then((res) => {
    return res.data;
  });
};
