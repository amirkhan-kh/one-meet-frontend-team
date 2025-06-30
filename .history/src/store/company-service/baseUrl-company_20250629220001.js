import axios from 'axios';

export const companyURl = axios.create({
  baseURL: 'https://api.onemeet.app/company', 
  withCredentials: true,
});
