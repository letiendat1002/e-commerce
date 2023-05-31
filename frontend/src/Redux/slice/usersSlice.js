import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosClient4 from "../api/axiosCustom";

const initialState = {
    data: [], 
    loading: true, 
    message: ""
}

export const getUserForID = createAsyncThunk('user/getuserForID', async (data) => {
    try {
          const response = await axiosClient4.get(`users/${data}`)
          return response.data
      }
      catch(error) {
          console.log("error: ", error);
          throw error
      }
  })

export const changePassword = createAsyncThunk('user/changePassword', async(data) => {
    try {
        const response = await axiosClient4.put(`auth/changePassword`, data)
        return response
    }
    catch(error) {
        console.log("error: ", error);
        throw error
    }
})
  
export const getAllUser = createAsyncThunk('getAllUser', async (data) => {
    try {
          const response = await axiosClient4.get('users')
          return response.data
      }
      catch(error) {
          console.log("error: ", error);
          throw error
      }
  }) 

export const updateUser = createAsyncThunk('user/updateUSer', async({userID, data}) => {
    try {
        const response = await axiosClient4.put(`users/${userID}`, data)
        return response
    }
    catch(error) {
        console.log("error: ", error);
        throw error
    }
})

export const resetPassword = createAsyncThunk('user/reserPassword', async(email) => {
    try {
        const response = await axiosClient4.post(`auth/resetPassword?email=${email}`)
        return response
    }
    catch(error) {
        console.log("error: ", error);
        throw error
    }
})

export const UserAPISlice = createSlice({
    name: "userAPI", 
    initialState, 
    reducers:  {}, 
    extraReducers: (builder) => {
        builder.addCase(getUserForID.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getUserForID.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getUserForID.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getAllUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(changePassword.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(changePassword.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(resetPassword.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = true
        })
    }
})


export default UserAPISlice.reducer