
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 🧠 1. AsyncThunk — companyId asosida paymentlarni olish
export const fetchPaymentsByCompany = createAsyncThunk(
  "payments/fetchByCompany",
  async (companyId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://api.onemeet.app/payment/get-company-id/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🧠 2. Slice — Redux slice + reducers
const paymentsByCompanySlice = createSlice({
  name: "paymentsByCompany",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentsByCompany: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentsByCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentsByCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPaymentsByCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching payments by company";
      });
  },
});

// 🧠 3. Export
export const { clearPaymentsByCompany } = paymentsByCompanySlice.actions;
export default paymentsByCompanySlice.reducer;
