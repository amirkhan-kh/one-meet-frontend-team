import { createAsyncThunk } from "@reduxjs/toolkit";
import { companyURl } from "./baseUrl-company";

export const fetchCompanies = createAsyncThunk('company/fetchCompanies', async () => {
  const response = await axios.get(companyURl);
  return response.data;
});