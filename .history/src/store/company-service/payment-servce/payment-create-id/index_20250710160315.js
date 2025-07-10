import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const data = createAsyncThunk(
  'payment/create',
  async ({ companyId, planId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(
        `https://api.onemeet.app/payment/create/${companyId}/${planId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearPaymentStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Payment failed';
      });
  }
});

export const { clearPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
