import { STATIC_HOST } from '../constant/common';
import { STATIC_HOST_2 } from '../constant/common';
import axios from 'axios';
import axiosClient from '../API/axiosClient';
import axiosClient4 from '../API/axiosCustom';

const SCHEMA = 'products';

const productApi = {
  async getAllCategory() {
    const categoryListFilter = await axios.get(`https://5i5iavxp88.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/categories`);
    // console.log(productListFilter)
    return categoryListFilter;
  },

  async getAllProducts() {
    const listProducts = await axiosClient4.get(`products`);
    return listProducts;
  },

  async getDetailProduct(id) {
    const detailProduct = await axiosClient4.get(`products/${id}`);
    return detailProduct;
  },

  async putProduct(id, payload) {
    const putProduct = await axiosClient4.put(`products/${id}`, payload);
    return putProduct;
  },

  async deleteProduct(id) {
    const deleteProduct = await axiosClient4.delete(`products/${id}`);
    return deleteProduct;
  },

  async putCategories(payload) {
    const { categoryID, name, slug, image } = payload;
    const putCategories = await axiosClient4.put(`categories/${categoryID}`, { name, slug, image });
    return putCategories;
  },

  async addCategories(payload) {
    const data = {
      ...payload,
      image: 'image',
    };
    const addCategories = await axiosClient4.post(`categories`, data);
    return addCategories;
  },
  async deleteCategories(id) {
    const addCategories = await axiosClient4.delete(`categories/${id}`);
    return addCategories;
  },
  async postProduct(payload) {
    const postProduct = await axiosClient4.post(`products`, payload);
    return postProduct;
  },
};

export default productApi;
