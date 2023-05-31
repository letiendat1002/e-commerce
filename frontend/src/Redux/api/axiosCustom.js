import axios from 'axios';
import {STATIC_HOST_4} from '../../constant/common'

const axiosClient4 = axios.create({
  baseURL: `${STATIC_HOST_4}`,
  withCredentials: false,
  accesscontrolalloworigin: '*',
  accesscontrolallowMethods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
});

// Add a request interceptor
axiosClient4.interceptors.request.use(
  function (config) {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      config.headers.Authorization=`Bearer ${access_token}`
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient4.interceptors.response.use(
  function (res) {
    return res.data;
  },
  function (error) {
    return error.response && error.response ? error.response.data : Promise.reject(error);
  }
);

export default axiosClient4;