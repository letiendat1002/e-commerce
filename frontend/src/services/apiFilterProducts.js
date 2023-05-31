import axios from 'axios';
import { STATIC_HOST_2 } from '../constant/common';
import { STATIC_HOST } from '../constant/common';
import axiosClient from '../API/axiosClient';
import axiosClientFilter from '../API/axiosClientFilter';

const SCHEMA = '';

const productFilterApi = {
  async getProducts(path, optional = {}) {
    const productList = await axiosClientFilter.get(path, optional);

    console.log(productList);

    return productList.data;
  },
};

export default productFilterApi;
