import axios from "axios";

export const ApiPost = (url, data, config) => {
  let properties = {
    method: "POST",
    url: "http://10.0.0.103:8081/" + url,
    data: data,
  };

  for (let x in config) {
    properties[x] = config[x];
  }

  return axios({
    ...properties,
  });
};

export const ApiGet = (url, config) => {
  let properties = {
    method: "GET",
    url: "http://10.0.0.103:8081/" + url,
  };
  for (let x in config) {
    properties[x] = config[x];
  }

  return axios({
    ...properties,
  });
};

export const ApiUpdate = (url, data, config) => {
  let properties = {
    method: "PUT",
    url: "http://10.0.0.103:8081/" + url,
  };
  for (let x in config) {
    properties[x] = config[x];
  }

  return axios({
    ...properties,
  });
};
