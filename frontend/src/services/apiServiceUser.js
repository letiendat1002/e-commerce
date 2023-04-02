import axios from 'axios';
import { STATIC_HOST_2, STATIC_HOST } from '../constant/common';
import axiosClient from '../API/axiosClient';
import axiosClientProducts from '../API/axiosClientProducts';

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

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append('id', id);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);
  console.log(data);

  const url = `${STATIC_HOST_2}/participant`;

  return axiosClient.put(url, data);
};

const deleteUpdateUser = (idUser) => {
  const url = `${STATIC_HOST_2}/participant`;

  return axiosClient.delete(url, { data: { id: idUser } });
};

const getUserWithPaginate = (page, limit) => {
  const url = `${STATIC_HOST_2}/participant?page=${page}&limit=${limit}`;

  return axiosClient.get(url);
};

const postUserLogin = (email, password) => {
  const url = `${STATIC_HOST_2}/login`;

  return axiosClient.post(url, { email, password });
};

const register = (data) => {
  const url = `/${STATIC_HOST}/local/register`;
  return axiosClient.post(url, data);
};

const login = ({ identifier, password },config) => {
  //user:adminHuy@gmail.com
  //pw:123456
  //user:admin@gmail.com
  //pw:123123
  const url = `/auth/local`;
  return axiosClientProducts.post(url, { identifier, password });
};

export {
  createNewUser,
  putUpdateUser,
  deleteUpdateUser,
  getUserWithPaginate,
  postUserLogin,
  register,
  login,
};
