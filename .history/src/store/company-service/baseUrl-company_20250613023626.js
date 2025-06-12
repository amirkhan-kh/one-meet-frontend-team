import axios from 'axios';

export const urlByToken = axios.create({
  baseURL: 'http://localhost:8083/companies',
});

urlByToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
