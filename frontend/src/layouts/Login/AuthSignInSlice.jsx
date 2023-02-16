import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import authApi from '../../Redux/api/auth';
import { toast } from 'react-toastify';
export const initialState = {
  token: '',
  state: 'idle',
};

export const authenticate = createAsyncThunk('signIn', async (data) => {
  const { username, password } = data;
  const signIn = await authApi.postAuthSignIn(username, password);
  if (signIn.token) {
    toast.success('Đăng nhập thành công!');
  }
  Cookies.set('token', signIn.token, { expires: 7 });
  Cookies.set('refreshToken', signIn.refreshToken, { expires: 7 });
  return signIn;
});

export const authSignInSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //sign in
    builder.addCase(authenticate.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.status = 'idle';
      state.token = action.payload;
    });
    builder.addCase(authenticate.rejected, (state) => {
      state.status = 'failed';
      state.token = '';
      toast.error('Đăng nhập thất bại!');
    });
  },
});

export default authSignInSlice.reducer;
