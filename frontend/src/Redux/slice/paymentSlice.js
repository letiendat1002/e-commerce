import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosClient4 from "../api/axiosCustom"
import { toast } from "react-toastify"

const initialState = { 
    loading: true,
    data: [],
    status: ""
}

export const orderPayment = createAsyncThunk('orderPayment', async(data) => {
    try {
        const response = await axiosClient4.post('orders', data)
        return response

    }
    catch(error){
        console.log("error: ", error)
        throw error
    }
})

export const updateOrders = createAsyncThunk('updateOrders', async({orderID, data}) => {
    try {
        const response = await axiosClient4.put(`orders/${orderID}`, data)
        return response

    }
    catch(error){
        console.log("error: ", error)
        throw error
    }
})

export const getOrder = createAsyncThunk('getOrder', async(body) => {
    try {
        const response = await axiosClient4.get(`orders?userID=${body}`)
        return response.data
    }
    catch(error) {
        console.log("error: ", error);
        throw error
    }
})

export const orderSlice = createSlice({
    name: 'order', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(orderPayment.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.meta 
            state.status = action.payload
        })
        builder.addCase(orderPayment.pending, (state, action) => {
            state.loading = true
            state.status = action.payload
        })
        builder.addCase(orderPayment.rejected, (state, action) => {
            state.loading = true
            state.status = action.payload
        })
        builder.addCase(getOrder.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.status = 200
        })
        builder.addCase(getOrder.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateOrders.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateOrders.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.status = 200
        })
        builder.addCase(updateOrders.rejected, (state, action) => {
            state.loading = true
        })
    }
})

export default orderSlice.reducer