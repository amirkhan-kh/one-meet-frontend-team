import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

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

      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const companyByOwnerSlice = createSlice({
  name: 'companyByOwner',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyByOwnerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyByOwnerId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanyByOwnerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching company data';
      });
  },
});

export default companyByOwnerSlice.reducer;
