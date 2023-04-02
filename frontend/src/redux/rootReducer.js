import { combineReducers } from 'redux';
import { productReducers } from './productReducer';
import userReducers from './userReducers';
// import reducers from './Reducers/index2';
import productReducer from './Reducers/productReducer';
import { cartReducer } from './Reducers/cartReducer';

const rootReducer = combineReducers({
  userLogin: userReducers,
  dataProduct: productReducers,
  allProducts: productReducer,
  cart: cartReducer,
});

export default rootReducer;
