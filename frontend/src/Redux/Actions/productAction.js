import {
    PRODUCT_SET,
    PRODUCT_SELECT,
    PRODUCT_REMOVE,
  } from "../Constants/productConstant";
  
  
  
  export const setProducts = (products) => {
    return {
      type: PRODUCT_SET,
      payload: products,
    };
  };
  
  export const selectProduct = (product) => {
    return {
      type: PRODUCT_SELECT,
      payload: product,
    };
  };
  
  export const removeSelectedProduct = () => {
    return {
      type: PRODUCT_REMOVE,
    };
  };