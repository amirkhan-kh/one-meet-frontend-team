import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { companyURl } from '@/lib/axios'; // siz yozgan axios instance

export const fetchCompanyById = createAsyncThunk(
  'company/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await companyURl.get(`/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 2. Slice
const companySlice = createSlice({
  name: 'company',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCompany: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Xatolik yuz berdi';
      });
  }
});

export const { clearCompany } = companySlice.actions;

export default companySlice.reducer;
