import axios from 'axios';

export const companyUrlByToken = axios.create({
  baseURL: 'http://localhost:8083/companies',
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
const companyURl = 'http://localhost:8083/companies'