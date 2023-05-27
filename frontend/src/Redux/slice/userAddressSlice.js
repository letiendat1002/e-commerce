import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient4 from '../api/axiosCustom';
import { toast } from 'react-toastify';

const initialState = {
  loading: true,
  data: [],
};

export const getUserAddressForIDUser = createAsyncThunk('getUserAddressForIDUser', async (body) => {
  try {
    const response = await axiosClient4.get(`useraddresses?userID=${body}`);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
});

export const addAddress = createAsyncThunk('addAddress', async (data) => {
  try {
    const response = await axiosClient4.post('useraddresses', data);
    return response;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
});

export const deleteAddress = createAsyncThunk('deleteAddress', async (userAddressID) => {
  try {
    const response = await axiosClient4.delete(`useraddresses/${userAddressID}`);
    return response;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
});

export const updateAddress = createAsyncThunk('updateAddress', async ({ userAddressID, data }) => {
  try {
    const response = await axiosClient4.put(`useraddresses/${userAddressID}`, data);
    return response;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
});

export const addressSlice = createSlice({
  name: 'userAddress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAddressForIDUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserAddressForIDUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUserAddressForIDUser.rejected, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.loading = true;
    });
  },
});

export default addressSlice.reducer;
