import axios from 'axios';
import { STATIC_HOST_2 } from '../constant/common';
import axiosClient from '../API/axiosClient';

const getAllUser = () => {
  const url = `${STATIC_HOST_2}/participant/all`;

  return axiosClient.get(url);
};

export { getAllUser };
