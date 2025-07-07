import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCompanyByOwnerId = createAsyncThunk(
  'company/fetchByOwnerId',
  async (ownerUserId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`https://api.onemeet.app/company/get-by-ownerUserId/${ownerUserId}`, {
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
