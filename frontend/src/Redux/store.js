import { configureStore } from '@reduxjs/toolkit';
// import authSignInSlice  from "../layouts/login/AuthSignInSlice";
import cartReducer from './slice/cartSlice';
import userReducer from './slice/userSlice';
import productReducer from './slice/productSlice'
import categoriesReducer from './slice/categorySlice'

const store = configureStore({
  reducer: {
    allCart: cartReducer,
    user: userReducer,
    product: productReducer,
    categories: categoriesReducer,
  },
  // authSlice: authSignInSlice,
});

export default store;