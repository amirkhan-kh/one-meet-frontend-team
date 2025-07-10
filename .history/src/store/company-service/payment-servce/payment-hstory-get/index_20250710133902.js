
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchAllPayments = createAsyncThunk(
//   'payments/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await axios.get('https://api.onemeet.app/payment/get-all', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const paymentSlice = createSlice({
//   name: 'payments',
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearPayments: (state) => {
//       state.data = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllPayments.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllPayments.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchAllPayments.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Error fetching payments';
//       });
//   },
// });

// export const { clearPayments } = paymentSlice.actions;
// export default paymentSlice.reducer;


// fetch-by-company-id.js yoki payment-hstory-get.js ichida
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPaymentsByCompany = createAsyncThunk(
  "payments/fetchByCompany",
  async (companyId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://api.onemeet.app/payment/get-by-companyId/${companyId}`,
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
