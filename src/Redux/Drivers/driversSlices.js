import { createSlice } from '@reduxjs/toolkit';
import {
  addDriver,
  deleteDriver,
  fetchDrivers,
  updateDriver,
} from './driversThunks';

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
      .addCase(addDriver.rejected, handleRejected)
      .addCase(deleteDriver.pending, handlePending)
      .addCase(deleteDriver.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.drivers.findIndex(
          (driver) => driver._id === action.payload._id
        );
        state.drivers.splice(index, 1);
      })
      .addCase(deleteDriver.rejected, handleRejected)
      .addCase(updateDriver.pending, handlePending)
      .addCase(updateDriver.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedDriver = action.payload;
        const updatedDriverIndex = state.drivers.findIndex(
          (driver) => driver._id === updatedDriver._id
        );
        state.drivers[updatedDriverIndex] = updatedDriver;
      })
      .addCase(updateDriver.rejected, handleRejected);
  },
});

export const driversReducer = driverSlice.reducer;
