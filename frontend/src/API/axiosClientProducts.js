import axios from 'axios';
import { STATIC_HOST } from '../constant/common';

const axiosClient = axios.create({
  baseURL: `${STATIC_HOST}/`,
  // headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log(config)
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (res) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(res);
    return res.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return error.response && error.response ? error.response.data : Promise.reject(error);
  }
);

export default axiosClient;
