import { createAsyncThunk } from "@reduxjs/toolkit";
import { companyURl } from "./baseUrl-company";
import axios from "axios";


//GET request
export const fetchCompanies = createAsyncThunk('company/fetchCompanies', async () => {
  const response = await axios.get(companyURl);
  return response.data;
});

//PUT request
export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async ({ id, data }: { id: number; data: any }) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  }
);

//
export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);