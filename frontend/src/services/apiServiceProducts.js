import axios from 'axios';
import { STATIC_HOST_2 } from '../constant/common';
import { STATIC_HOST } from '../constant/common';
import axiosClient from '../API/axiosClient';
import axiosClientProducts from '../API/axiosClientProducts';

const SCHEMA = 'products';

const productApi = {
  async getAll(params) {
    // const productList = await axiosClient.get(`/${SCHEMA}`)
    // const productList = await axiosClient.get(`https://dummyjson.com/products`)

    // Transform _page  to _start
    const newParams = {
      ...params,
    };
    // console.log(params);

    newParams._start =
      !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 50);

    // // Remove un-needed key
    delete newParams._page;

    // Fetch product list and count
    // product 1
    const productList = await axiosClientProducts.get(`/${SCHEMA}`, {
      params: newParams,
    });

    const count = await axiosClientProducts.get(`/${SCHEMA}/count`, {
      params: newParams,
    });

    //product 2
    // const productList = await axiosClient.get(
    //   `https://63fa3834beec322c57ef9ead.mockapi.io/api/v1/products`,{params: newParams,}
    // );

    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },
  async getAllProduct() {
    const productListFilter = await axiosClientProducts.get(`/${SCHEMA}`);
    // console.log(productListFilter)
    return productListFilter
  }
};

export default productApi;
