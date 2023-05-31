import UserAPIReducer from './slice/usersSlice';
import addressReducer from './slice/userAddressSlice'
import cartAdminReducer from './slice/cartAdminSlice';
import cartReducer from './slice/cartSlice';
import categoriesReducer from './slice/categorySlice'
import { configureStore } from '@reduxjs/toolkit';
import orderDetailReducer from './slice/orderDetailSlice';
import orderReducer from './slice/paymentSlice'
import productReducer from './slice/productSlice'
import ratingReducer from './slice/ratingSlice'
import shipperReducer from './slice/shipperSlice'
import userReducer from './slice/userSlice';

// import authSignInSlice  from "../layouts/login/AuthSignInSlice";

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
    userAPI: UserAPIReducer, 
    rating: ratingReducer,
    shipper: shipperReducer,
  },
  // authSlice: authSignInSlice,
});

export default store;