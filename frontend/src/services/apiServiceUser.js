import axios from 'axios';
import { STATIC_HOST_2 } from '../constant/common';

import axiosClient4 from '../API/axiosCustom';

const createNewUser = (email, password, fullName, gender, phone, image) => {
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
    image,
  };

  const url = `users`;

  return axiosClient4.post(url, data);
};

//PUT user BE java
const putUpdateUser = (userID, fullName, gender, phone, image,role) => {
  const data = {
    roles: [role],
    fullName,
    gender,
    phone,
    image
  };
  const url = `users/${userID}`;

  return axiosClient4.put(url, data);
};

const deleteUpdateUser = (id) => {
  const url = `users/${id}`;

  return axiosClient4.delete(url);
};

//get user BE java
const getUsers = async () => {
  const url = `users`;

  // const res = await axiosClient4.get(url)

  return axiosClient4.get(url);
};

export { createNewUser, putUpdateUser, deleteUpdateUser, getUsers };
