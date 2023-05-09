import axios from 'axios';
import { STATIC_HOST_2 } from '../constant/common';
import { STATIC_HOST } from '../constant/common';
import axiosClient from '../API/axiosClient';
import axiosClient4 from '../API/axiosCustom';

const SCHEMA = 'products';

const productApi = {
  async getAllCategory() {
    const categoryListFilter = await axios.get(`http://localhost:8080/api/v1/categories`);
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
    const data = {
      image: '',
      imageReview1: '',
      imageReview2: '',
      imageReview3: '',
      ...payload,
    };
    const putProduct = await axiosClient4.put(`products/${id}`, data);
    console.log(putProduct);
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
};

export default productApi;
