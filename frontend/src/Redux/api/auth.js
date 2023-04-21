import axiosClient from './axiosClient';
import axiosLoginRes from './axiosLoginRes';

const SCHEMA = 'auth';
const authApi = {
  // postAuthSignIn(username, password) {
  //   const url = '/api/auth/login';
  //   const payload = { username: username, password: password };
  //   return axiosClient.post(url, payload);
  // },
  login(identifier, password) {
    const url = `/${SCHEMA}/local`;
    const payload = { identifier, password };
    return axiosLoginRes.post(url, payload);
  },
  register (data){
    const url=`/${SCHEMA}/local/register`;
    return axiosLoginRes.post(url,data);
  },
};

export default authApi;
