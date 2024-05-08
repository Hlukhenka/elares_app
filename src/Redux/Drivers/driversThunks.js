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
      const res = await axios.post('driver/addDriver', credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDriver = createAsyncThunk(
  'drivers/deleteDriver',
  async (_id, thunkAPI) => {
    try {
      const res = await axios.delete(`driver/deleteDriver/${_id}`);

      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateDriver = createAsyncThunk(
  'driver/updateDriver',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.put('driver/updateDriver', credentials);
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
