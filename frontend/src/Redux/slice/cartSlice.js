import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Products from '../../assets/data/product';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

let dataCart= JSON.parse(localStorage.getItem('cartItem'))
const initialState = {
  cart: dataCart|| [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.ProductID === action.payload.ProductID);
      if (itemIndex >= 0) {
        state.cart[itemIndex].cartQuantity += 1;
        toast.success(`${action.payload.Name.slice(0, 20)} đã được thêm vào giỏ hàng`);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(tempProduct);
        toast.success(`${action.payload.Name.slice(0, 20)} đã được thêm vào giỏ hàng`);
      }
          localStorage.setItem('cartItem', JSON.stringify(state.cart));
          
    },
    removeFromToCart: (state, action) => {
      const nextCartItems = state.cart.filter(
        (cartItem) => cartItem.ProductID !== action.payload.ProductID
      );
      state.cart = nextCartItems;
      toast.warning(`${action.payload.Name.slice(0, 20)} đã xóa hết trong giỏ hàng`);
      localStorage.setItem('cartItem', JSON.stringify(state.cart));
    },
    decreamentFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.ProductID === action.payload.ProductID);

      if (state.cart[itemIndex].cartQuantity > 1) {
        state.cart[itemIndex].cartQuantity -= 1;
        toast.warn(`Bạn đã xóa 1 sản phẩm ${action.payload.Name.slice(0, 20)} vào giỏ hàng`);
      } else if (state.cart[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cart.filter(
          (cartItem) => cartItem.ProductID !== action.payload.ProductID
        );
        state.cart = nextCartItems;
        toast.warning(`${action.payload.Name.slice(0, 20)} đã xóa hết trong giỏ hàng`);
      }
      localStorage.setItem('cartItem', JSON.stringify(state.cart));
    },
    increamentFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.ProductID === action.payload.ProductID);

      if (state.cart[itemIndex].cartQuantity >= 1) {
        state.cart[itemIndex].cartQuantity += 1;
        toast.success(`Bạn đã thêm 1 sản phẩm ${action.payload.Name.slice(0, 20)} vào giỏ hàng`);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(tempProduct);
        toast.success(`${action.payload.Name.slice(0, 20)} đã được thêm vào giỏ hàng`);
      }
      localStorage.setItem('cartItem', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeFromToCart, decreamentFromCart, increamentFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
