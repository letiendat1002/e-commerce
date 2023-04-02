import { combineReducers } from 'redux';
import { productReducers } from './productReducer';
import userReducers from './userReducers';
import productReducer from './Reducers/productReducer';
import { cartReducer } from './Reducers/cartReducer';

const rootReducer = combineReducers({
  userLogin: userReducers,
  dataProduct: productReducers,
  allProducts: productReducer,
  cart: cartReducer,


export default rootReducer;
