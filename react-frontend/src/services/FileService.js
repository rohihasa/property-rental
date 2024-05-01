import httpClient from "./http-common";

const uploadFile = (data) => {
    return httpClient.post(`/file/upload`, data);
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    uploadFile
};