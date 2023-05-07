import axiosClient4 from '../../API/axiosCustom';

const SCHEMA = 'auth';
const authApi = {

  login(email, password) {
    const url = `/auth/authenticate`;
    const payload = { email, password };
    return axiosClient4.post(url, payload);
  },
  register(data) {
    const url = `/auth/register`;
    return axiosClient4.post(url, data);
  },
};

export default authApi;
