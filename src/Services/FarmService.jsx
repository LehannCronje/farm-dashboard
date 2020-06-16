import { ApiGet, ApiPost } from "Utils/ApiUtil";

export const GetFarms = () => {
  let url = "farms/";
  return ApiGet(url).then((res) => {
    return res.data;
  });
};

export const PostFarm = (data) => {
  let url = "farms/create";
  return ApiPost(url, data);
};
