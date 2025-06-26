import axios from 'axios';

export const companyUrlByToken = axios.create({
  baseURL: `${import.meta.env.VITE_COMPANY_API}`,
  withCredentials: true,
});


export const companyURl = `${import.meta.env.VITE_COMPANY_API}`