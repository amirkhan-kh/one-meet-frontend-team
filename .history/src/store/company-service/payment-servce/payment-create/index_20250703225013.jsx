import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPlan = createAsyncThunk(
  'plan/createPlan',
  async (planData, { rejectWithValue, getState }) => {
    try {
      // 1-usul: tokenni localStorage dan olish
      const token = localStorage.getItem('token');

      // 2-usul (agar tokenni Redux store'da saqlayotgan bo‘lsang)
      // const token = getState().auth.token;

      const response = await axios.post(
        'https://api.onemeet.app/plan/create',
        planData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.data; // faqat plan data
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
