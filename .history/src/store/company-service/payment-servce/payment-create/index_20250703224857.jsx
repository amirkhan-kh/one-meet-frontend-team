// planSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPlan = createAsyncThunk(
  'plan/createPlan',
  async (planData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://api.onemeet.app/plan/create', planData);
      return response.data.data; // only the "data" field (id, name, etc.)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔥 Slice
const planSlice = createSlice({
  name: 'plan',
  initialState: {
    plan: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plan = action.payload;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default planSlice.reducer;
