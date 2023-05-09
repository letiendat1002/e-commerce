import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

let dataCart= JSON.parse(localStorage.getItem('cartAdmin'))
const initialState = {
  cart: dataCart || [],
  totalQuantity: 0,
  totalPrice: 0
};

export const cartAdminSlice = createSlice({
  name: 'cartAdmin',
  initialState,
  reducers: {
    addToCartAdmin: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.productID === action.payload.productID);
      if (itemIndex >= 0) {
        state.cart[itemIndex].cartQuantity += 1;
        toast.success(`${action.payload.name.slice(0, 20)} đã được thêm vào giỏ hàng`);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(tempProduct);
        toast.success(`${action.payload.name.slice(0, 20)} đã được thêm vào giỏ hàng`);
      }
          localStorage.setItem('cartAdmin', JSON.stringify(state.cart));
          
    },
    removeFromToCartAdmin: (state, action) => {
      const nextCartItems = state.cart.filter(
        (cartItem) => cartItem.productID !== action.payload.productID
      );
      state.cart = nextCartItems;
      toast.warning(`${action.payload.name.slice(0, 20)} đã xóa hết trong giỏ hàng`);
      localStorage.setItem('cartAdmin', JSON.stringify(state.cart));
    },
    decreamentFromCartAdmin: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.productID === action.payload.productID);

      if (state.cart[itemIndex].cartQuantity > 1) {
        state.cart[itemIndex].cartQuantity -= 1;
        toast.warn(`Bạn đã xóa 1 sản phẩm ${action.payload.name.slice(0, 20)} vào giỏ hàng`);
      } else if (state.cart[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cart.filter(
          (cartItem) => cartItem.productID !== action.payload.productID
        );
        state.cart = nextCartItems;
        toast.warning(`${action.payload.name.slice(0, 20)} đã xóa hết trong giỏ hàng`);
      }
      localStorage.setItem('cartAdmin', JSON.stringify(state.cart));
    },
    increamentFromCartAdmin: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.productID === action.payload.productID);

      if (state.cart[itemIndex].cartQuantity >= 1) {
        state.cart[itemIndex].cartQuantity += 1;
        toast.success(`Bạn đã thêm 1 sản phẩm ${action.payload.name.slice(0, 20)} vào giỏ hàng`);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(tempProduct);
        toast.success(`${action.payload.name.slice(0, 20)} đã được thêm vào giỏ hàng`);
      }
      localStorage.setItem('cartAdmin', JSON.stringify(state.cart));
    },
  },
});

export const { addToCartAdmin, removeFromToCartAdmin, decreamentFromCartAdmin, increamentFromCartAdmin } =
  cartAdminSlice.actions;

export default cartAdminSlice.reducer;
