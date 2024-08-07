import axios from 'axios';
import { getCookies } from './cookie';

const baseApiHub = import.meta.env.VITE_API_URL;
const baseApi = import.meta.env.VITE_BASE_URL;
// const baseApi = process.env.VITE_BASE_URL_LOCAL;
const loginData = getCookies('loginData');

export const apiHub = axios.create({
  baseURL: baseApiHub,
});

export const api = axios.create({
  baseURL: baseApi,
  headers: {
    'Authorization': loginData,
  },
});
