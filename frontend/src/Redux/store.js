import { configureStore } from '@reduxjs/toolkit';
// import authSignInSlice  from "../layouts/login/AuthSignInSlice";
import cartReducer from './slice/cartSlice';
import userReducer from './slice/userSlice';
import productReducer from './slice/productSlice'
import categoriesReducer from './slice/categorySlice'
import addressReducer from './slice/userAddressSlice'
import orderReducer from './slice/paymentSlice'
import orderDetailReducer from './slice/orderDetailSlice';
import UserAPIReducer from './slice/usersSlice';
import cartAdminReducer from './slice/cartAdminSlice';

const store = configureStore({
  reducer: {
    allCart: cartReducer,
    allAdminCart: cartAdminReducer,
    user: userReducer,
    product: productReducer,
    categories: categoriesReducer,
    userAddress: addressReducer,
    order: orderReducer,
    orderDetail: orderDetailReducer, 
    userAPI: UserAPIReducer
  },
  // authSlice: authSignInSlice,
});

export default store;