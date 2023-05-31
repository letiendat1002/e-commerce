import axios from 'axios';
import { STATIC_HOST_4 } from '../constant/common';

const axiosClient4 = axios.create({
  baseURL: `${STATIC_HOST_4}/`,
  // headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
  accesscontrolalloworigin: '*',
  accesscontrolallowMethods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
});

// Add a request interceptor
axiosClient4.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient4.interceptors.response.use(
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

export default axiosClient4;
