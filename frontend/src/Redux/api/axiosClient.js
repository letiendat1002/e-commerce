import axios from 'axios';
// import { API_HOST } from '../../constant/path';
import Cookies from 'js-cookie';
import authApi from './auth';

const axiosClient = axios.create({
  baseURL:"test",
  headers: {
    'Content-type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const token = Cookies.get('token');
    const refreshToken = Cookies.get('refreshToken');
    if (
      refreshToken &&
      (!token || JSON.parse(atob(token.split('.')[1])).exp * 1000 < new Date().getTime())
    ) {
      authApi.postAuthRefreshToken(refreshToken).then((response) => {
        Cookies.set('token', response.token);
        Cookies.set('refreshToken', response.refreshToken);
      });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
