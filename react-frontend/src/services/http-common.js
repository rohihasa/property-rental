import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    let jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      jwtToken = jwtToken.substring(7);
      jwtToken = jwtToken.split(";")[0];
      config.headers.Authorization = jwtToken;
    } else {
      config.headers.Authorization = "Bearer=";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;