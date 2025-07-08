import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk — barcha rejalarni olish
export const fetchAllPlans = createAsyncThunk(
  'plans/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('https://api.onemeet.app/plan/get-all-plan', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const plansSlice = createSlice({
  name: 'plans',
  initialState: {
    dataPlan: [],
    loadingPlan: false,
    errorPlan: null,
  },
  reducers: {
    clearPlans: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlans.pending, (state) => {
        state.loadingPlan = true;
        state.error = null;
      })
      .addCase(fetchAllPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching plans';
      });
  },
});

export const { clearPlans } = plansSlice.actions;
export default plansSlice.reducer;
