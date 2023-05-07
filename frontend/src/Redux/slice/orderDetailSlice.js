import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosClient4 from "../api/axiosCustom"
import { toast } from "react-toastify"

const initialState = { 
    loading: true,
    data: [],
    status: ""
}

export const orderDetail = createAsyncThunk('orderDetail', async(data) => {
    try {
        const response = await axiosClient4.post('orderdetails', data)
        return response
    }
    catch(error){
        console.log("error: ", error)
        throw error
    }
})

export const getOrderDetail = createAsyncThunk('getOrderDetail', async(data) => {
    try {
        const response = await axiosClient4.get(`orderdetails`, data)
        return response
    }
    catch(error){
        console.log("error: ", error)
        throw error
    }
})

export const orderDetailSlice = createSlice({
    name: 'orderDetail', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(orderDetail.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.meta 
            state.status = action.payload
        })
        builder.addCase(orderDetail.pending, (state, action) => {
            state.loading = true
            state.status = action.payload
        })
        builder.addCase(orderDetail.rejected, (state, action) => {
            state.loading = true
            state.status = action.payload
        })
        builder.addCase(getOrderDetail.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getOrderDetail.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getOrderDetail.rejected, (state, action) => {
            state.loading = true
        })
    }
})

export default orderDetailSlice.reducer