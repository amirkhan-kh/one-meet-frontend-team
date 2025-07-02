import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');

      const res = await axios.get('https://api.onemeet.app/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data.index.jsx:14 Uncaught TypeError: Cannot read properties of null (reading 'firstName')
    at ProfileCompany (index.jsx:14:18)
ProfileCompany	@	index.jsx:14
<ProfileCompany>		
App	@	App.jsx:83
<App>		
(anonymous)	@	main.jsx:13

App.jsx:83 An error occurred in the <ProfileCompany> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.
<ProfileCompany>		
App	@	App.jsx:83
<App>		
(anonymous)	@	main.jsx:13
﻿

;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const userSlice = createSlice({
  name: 'companyProfileGet',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Xatolik yuz berdi';
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
