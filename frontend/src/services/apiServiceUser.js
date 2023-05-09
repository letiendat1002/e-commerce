import axios from 'axios';
import { STATIC_HOST_2, STATIC_HOST } from '../constant/common';
import axiosClient from '../API/axiosClient';
import axiosClientProducts from '../API/axiosClientProducts';
import axiosClient4 from '../API/axiosCustom';

const createNewUser = (email, password, fullName, gender, phone) => {
  // const data = new FormData();
  // data.append('email', email);
  // data.append('password', password);
  // data.append('username', username);
  // data.append('role', role);
  // data.append('userImage', image);
  // console.log(data);

  const data = {
    email,
    password,
    fullName,
    gender,
    phone,
    image:""
  }

  const url = `users`;

  return axiosClient4.post(url, data);
};

//PUT user BE java
const putUpdateUser = (userID, fullName, gender, phone, image) => {
  const data = {
    roles: ['CUSTOMER'],
    fullName,
    gender,
    phone,
    image: '',
  };
  const url = `users/${userID}`;

  return axiosClient4.put(url, data);
};

const deleteUpdateUser = (id) => {
  const url = `users/${id}`;

  return axiosClient4.delete(url);
};

const getUserWithPaginate = (page, limit) => {
  const url = `${STATIC_HOST_2}/participant?page=${page}&limit=${limit}`;

  return axiosClient.get(url);
};

//get user BE java
const getUsers = async () => {
  const url = `users`;

  // const res = await axiosClient4.get(url)

  return axiosClient4.get(url);
};

const postUserLogin = (email, password) => {
  const url = `${STATIC_HOST_2}/login`;

  return axiosClient.post(url, { email, password });
};

export {
  createNewUser,
  putUpdateUser,
  deleteUpdateUser,
  getUserWithPaginate,
  postUserLogin,
  getUsers,
};
