export const fetchCompanies = createAsyncThunk('company/fetchCompanies', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});