import axios from 'axios';

export const companyUrlByToken = axios.create({
  baseURL: 'https://api.onemeet.app/company', 
  withCredentials: true,
});
