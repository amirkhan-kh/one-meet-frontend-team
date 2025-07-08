import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPayment = createAsyncThunk(
  'payment/create',
  async ({ companyId, planId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(
        `https://api.onemeet.app/payment/create/${companyId}/${planId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
