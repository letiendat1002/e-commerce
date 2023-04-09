import axiosClient from "./axiosClient";

const authApi = {
  postAuthSignIn(username, password) {
    const url = '/api/auth/login';
    const payload = { username: username, password: password };
    return axiosClient.post(url, payload);
  },
};

export default authApi;