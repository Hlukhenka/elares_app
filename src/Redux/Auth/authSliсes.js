import { createSlice } from '@reduxjs/toolkit';
import { register, login, logOut, getCurrentUser } from './authThunks';

const initialState = {
  user: { name: '', surname: '' },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;
