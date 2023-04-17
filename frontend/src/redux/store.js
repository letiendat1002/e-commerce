import { configureStore } from "@reduxjs/toolkit";
import authSignInSlice  from "../layouts/login/AuthSignInSlice";
import cartReducer from "./slice/cartSlice";

const store = configureStore(
  {
    reducer: {
      allCart: cartReducer,
    }
      // authSlice: authSignInSlice,
  },
);

export default store;