import axios from "axios";

export const ApiPost = (url, data, config) => {
  let properties = {
    method: "POST",
    url: "http://3.136.56.235:8080/" + url,
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
    url: "http://3.136.56.235:8080/" + url,
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
    url: "http://3.136.56.235:8080/" + url,
  };
  for (let x in config) {
    properties[x] = config[x];
  }

  return axios({
    ...properties,
  });
};

export const ApiDelete = (url, data, config) => {
  let properties = {
    method: "DELETE",
    url: "http://3.136.56.235:8080/" + url,
  };
  for (let x in config) {
    properties[x] = config[x];
  }

  return axios({
    ...properties,
  });
};
