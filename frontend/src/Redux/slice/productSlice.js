import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios"
import axiosClient4 from "../api/axiosCustom";

const initialState = {
    productLoading: true, 
    data: null, 
    message: ""
}

export const getAllProducts = createAsyncThunk('getAllProducts', async() => {
    try {
        const response = await axiosClient4.get('/products')
        return response
      } catch (error) {
        console.log('error: ', error)
        throw error
      }
});

export const getAllProductForType = createAsyncThunk('getAllProductForType', async(body) => {
    try {
        const response = await axiosClient4.get('/products', body)
        return response
      } catch (error) {
        console.log('error: ', error)
        throw error
      }
})

export const productSlice = createSlice({
    name: "products", 
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.productLoading = true;
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.productLoading = false;
            state.data = action.payload.data
            state.message = action.payload.message
        });
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.productLoading = true;
            state.message = action.payload.message
        });
        builder.addCase(getAllProductForType.pending, (state, action) => {
            state.productLoading = true;
        });
        builder.addCase(getAllProductForType.fulfilled, (state, action) => {
            state.productLoading = false;
            state.data = action.payload.data
            state.message = action.payload.message
        });
        builder.addCase(getAllProductForType.rejected, (state, action) => {
            state.productLoading = true;
            state.message = action.payload.message
        });
    }
})

export default productSlice.reducer;