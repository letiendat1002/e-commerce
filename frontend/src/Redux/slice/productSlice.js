import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    productLoading: true, 
    data: null, 
    message: ""
}

export const getAllProducts = createAsyncThunk('getAllProducts', async() => {
    try {
        const response = await axios.get('/api/v1/products')
        return response.data
      } catch (error) {
        console.log('error: ', error)
        throw error
      }
});

export const getAllProductForType = createAsyncThunk('getAllProductForType', async(body) => {
    try {
        const response = await axios.get('/api/v1/products', body)
        return response.data
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