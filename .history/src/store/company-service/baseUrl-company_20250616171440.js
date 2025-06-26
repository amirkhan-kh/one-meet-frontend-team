import axios from 'axios';

export const companyUrlByToken = axios.create({
  baseURL: `${import.meta.env.VITE_COMPANY_API}`,
});

companyUrlByToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export const companyURl = `${import.meta.env.VITE_COMPANY_API}`