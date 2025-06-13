import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://api.noventer.uz/api/v1',
});