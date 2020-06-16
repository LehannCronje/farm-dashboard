import { ApiGet, ApiPost } from "Utils/ApiUtil";

export const generateSiteReport = (siteId) => {
  let config = {
    responseType: "arraybuffer",
  };
  let url = `report/site-report/${siteId}`;
  return ApiGet(url, config);
};

export const generateFarmReport = (farmId) => {
  
  let config = {
    responseType: "arraybuffer",
  };
  let url = `report/farm-report/${farmId}`;
  return ApiGet(url, config);
};

export const generateCropReport = (cropId) => {
  let config = {
    responseType: "arraybuffer",
  };
  let url = `report/crop-report/${cropId}`;
  return ApiGet(url, config);
};
