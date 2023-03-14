import axios from 'axios';
import { STATIC_HOST_2 } from '../constant/common';
import axiosClient from '../API/axiosClient';

const createNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);
  console.log(data);

  const url = `${STATIC_HOST_2}/participant`;

  return axiosClient.post(url, data);
};

export { createNewUser };
