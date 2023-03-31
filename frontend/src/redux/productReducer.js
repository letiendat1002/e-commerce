import { PRODUCT_SUCCESS } from '../constant/productsContants';

const productReducers = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SUCCESS:
      // console.log(action.payload)
      return {
        ...state,
        productList: action.payload,
      };

    default:
      return state;
  }
};

export { productReducers };
