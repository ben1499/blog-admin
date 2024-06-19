import axios from "axios";

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;