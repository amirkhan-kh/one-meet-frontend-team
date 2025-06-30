import axios from 'axios';

export const companyUrlByToken = axios.create({
  baseURL: 'https://api.onemeet.app/company', // kerakli endpointni to‘liq yozing
  withCredentials: true,
});
