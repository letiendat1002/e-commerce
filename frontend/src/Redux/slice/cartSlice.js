import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

let dataCart= JSON.parse(localStorage.getItem('cartItem'))
const initialState = {
  cart: dataCart || [],
  totalQuantity: 0,
  totalPrice: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.productID === action.payload.productID);
      if (itemIndex === 0 && itemIndex <=1) {
        state.cart[itemIndex].cartQuantity += 1;
        toast.success(`${action.payload.name.slice(0, 20)} đã được thêm vào giỏ hàng`);
      }
      else if (itemIndex >= 1) {
        state.cart[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(tempProduct);
        toast.success(`${action.payload.name.slice(0, 20)} đã được thêm vào giỏ hàng`);
      }
          localStorage.setItem('cartItem', JSON.stringify(state.cart));
          
    },
    removeFromToCart: (state, action) => {
      const nextCartItems = state.cart.filter(
        (cartItem) => cartItem.productID !== action.payload.productID
      );
      state.cart = nextCartItems;
      toast.warning(`${action.payload.name.slice(0, 20)} đã xóa hết trong giỏ hàng`);
      localStorage.setItem('cartItem', JSON.stringify(state.cart));
    },
    removeFromToCarts: (state, action) => {
      const nextCartItems = state.cart.filter(
        (cartItem) => cartItem.productID !== action.payload.productID
      );
      state.cart = nextCartItems;
      // toast.warning(`${action.payload.name.slice(0, 20)} đã xóa hết trong giỏ hàng`);
      localStorage.setItem('cartItem', JSON.stringify(state.cart));
    },
    decreamentFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.productID === action.payload.productID);

      if (state.cart[itemIndex].cartQuantity > 1) {
        state.cart[itemIndex].cartQuantity -= 1;
      } else if (state.cart[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cart.filter(
          (cartItem) => cartItem.productID !== action.payload.productID
        );
        state.cart = nextCartItems;
        toast.warning(`${action.payload.name.slice(0, 20)} đã xóa hết trong giỏ hàng`);
      }
      localStorage.setItem('cartItem', JSON.stringify(state.cart));
    },
    increamentFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.productID === action.payload.productID);

      if (state.cart[itemIndex].cartQuantity >= 1) {
        state.cart[itemIndex].cartQuantity += 1;
       } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(tempProduct);
        toast.success(`${action.payload.name.slice(0, 20)} đã được thêm vào giỏ hàng`);
      }
      localStorage.setItem('cartItem', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeFromToCart, removeFromToCarts, decreamentFromCart, increamentFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
