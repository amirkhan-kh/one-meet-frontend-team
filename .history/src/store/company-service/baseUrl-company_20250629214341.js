import axios from 'axios';

export const companyUrlByToken = axios.create({
  baseURL: `${import.meta.env.VITE_COMPANY_API}`,
  withCredentials: true,
});

axios.defaults.withCredentials = true;
