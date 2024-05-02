import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDrivers = createAsyncThunk(
  'drivers/list',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('driver/list');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addDriver = createAsyncThunk(
  'drivers/addDriver',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('driver/addDrivers', { credentials });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
