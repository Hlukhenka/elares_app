import { createSlice } from '@reduxjs/toolkit';
import { addDriver, fetchDrivers } from './driversThunks';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const driverSlice = createSlice({
  name: 'drivers',
  initialState: {
    drivers: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, handlePending)
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.error = null;
        state.drivers = action.payload.drivers;
      })
      .addCase(fetchDrivers.rejected, handleRejected)
      .addCase(addDriver.pending, handlePending)
      .addCase(addDriver.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.drivers.push(action.payload);
      })
      .addCase(addDriver.rejected, handleRejected);
  },
});

export const driversReducer = driverSlice.reducer;
