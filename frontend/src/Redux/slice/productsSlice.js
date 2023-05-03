// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import axios from "axios"
// import axiosClient4 from '../../API/axiosCustom';

// const initialState = {
//   productLoading: true,
//   data: null,
//   message: '',
// };

// export const getAllProduct = createAsyncThunk('getAllProducts', async () => {
//   try {
//     const response = await axiosClient4.get('/products');
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log('error: ', error);
//     throw error;
//   }
// });

// export const getAllProductForType = createAsyncThunk('getAllProductForType', async (body) => {
//   try {
//     const response = await axiosClient4.get('/api/v1/products', body);
//     return response.data;
//   } catch (error) {
//     console.log('error: ', error);
//     throw error;
//   }
// });
// export const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
// });

// export default productsSlice.reducer;
