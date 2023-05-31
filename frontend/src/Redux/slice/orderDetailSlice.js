import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axiosClient4 from "../api/axiosCustom"

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

export const refundOrderID = createAsyncThunk('refundOrderID', async(data) => {
    try {
        const response = await axiosClient4.put('orderdetails/refund', data)
        return response
    }
    catch(error){
        console.log("error: ", error)
        throw error
    }
})


export const getAllRefund = createAsyncThunk('getAllRefund', async(data) => {
    try {
        const response = await axiosClient4.get(`orderdetails/refund?status=ON_REFUND`, data)
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
        builder.addCase(refundOrderID.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(refundOrderID.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(refundOrderID.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllRefund.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllRefund.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.status = "getAllrefundSuccess"
        })
        builder.addCase(getAllRefund.rejected, (state, action) => {
            state.loading = true
            state.status = "getAllrefundFailed"
        })
    }
})

export default orderDetailSlice.reducer