import { createAsyncThunk } from "@reduxjs/toolkit";
import { companyURl } from "./baseUrl-company";
import axios from "axios";

export const fetchCompanies = createAsyncThunk('company/fetchCompanies', async () => {
  const response = await axios.get(companyURl);
  return response.data;
});