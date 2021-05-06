import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from './AccessToken';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'productionAPI'
    : 'http://localhost:4000/api';


export const getAuthRequest = (): AxiosInstance => {
  let token = getAccessToken()
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const request = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
