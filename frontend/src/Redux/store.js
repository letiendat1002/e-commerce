import { configureStore } from "@reduxjs/toolkit";
import reducers from "./Reducers/index";

const store = configureStore(
  {
    reducer: reducers,
    

  },
);

export default store;