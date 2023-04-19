import { configureStore } from '@reduxjs/toolkit';
// import authSignInSlice  from "../layouts/login/AuthSignInSlice";
import cartReducer from './slice/cartSlice';
import userReducer from './slice/userSlice';

const store = configureStore({
  reducer: {
    allCart: cartReducer,
    user: userReducer,
  },
  // authSlice: authSignInSlice,
});

export default store;
