import axiosClient4 from '../../API/axiosCustom';
import axiosClient from './axiosClient';
import axiosLoginRes from './axiosLoginRes';

const SCHEMA = 'auth';
const authApi = {
  // postAuthSignIn(username, password) {
  //   const url = '/api/auth/login';
  //   const payload = { username: username, password: password };
  //   return axiosClient.post(url, payload);
  // },
  login(email, password) {
    const url = `/auth/authenticate`;
    const payload = { email, password };
    return axiosClient4.post(url, payload);
  },
  // register(data) {
  //   const url = `/${SCHEMA}/local/register`;
  //   return axiosLoginRes.post(url, data);
  // },
};

export default authApi;
