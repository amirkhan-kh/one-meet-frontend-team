import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { companyURl } from "./baseUrl-company";
import axios from "axios";


//GET request
export const fetchCompanies = createAsyncThunk('company/fetchCompanies', async () => {
  const response = await axios.get(`${companyURl}/company/${}`);
  return response.data;
});

//PUT request
export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async ({ id, data }) => {
    const response = await axios.put(`${companyURl}/${id}`, data);
    return response.data;
  }
);

//DELETE
export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (id) => {
    await axios.delete(`${companyURl}/${id}`);
    return id;
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Xatolik yuz berdi';
      })

      // PUT
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.companies.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.companies[index] = action.payload;
      })

      // DELETE
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter((c) => c.id !== action.payload);
      });
  },
});

export default companySlice.reducer;