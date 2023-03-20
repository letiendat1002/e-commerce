import {
  PRODUCT_SET,
  PRODUCT_SELECT,
  PRODUCT_REMOVE,
} from "../Constants/productConstant";
import Products from "../../assets/data/product.js";


const initialState = {
  products:  [],
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_SET:
      return { ...state, products: payload };
    case PRODUCT_SELECT:
      return { ...state, selectedProduct: payload };
    case PRODUCT_REMOVE:
      return { ...state, selectedProduct: {} };
    default:
      return state;
  }
};
export default productReducer;