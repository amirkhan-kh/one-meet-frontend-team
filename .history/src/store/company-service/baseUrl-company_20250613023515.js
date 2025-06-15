import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://api.noventer.uz/api/v1',
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);